import React, { useState, useEffect } from "react";
import { View, Button, Share, Alert, ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import app from "../../Components/firebase";
import "firebase/firestore";
import "firebase/database";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
const styles = require("../../Styles/general");

const Policies = (props) => {
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(-1);

  async function uploadImage() {
    let file = await DocumentPicker.getDocumentAsync({});
    if (file.uri != null) {
      const blob = await new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.onload = function () {
          resolve(xml.response);
        };
        xml.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xml.responseType = "blob";
        xml.open("GET", file.uri, true);
        xml.send(null);
      });

      const ref = app.storage().ref(`/policies/${removeFileExtension(file.name)}`);
      const snapshot = ref.put(blob);

      snapshot.on(
        "state_changed",
        function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          setProgress(progress);
          if(progress == 1) {
            setProgress(-1);
          }
        },
        function (error) {
          console.log(error);
          blob.close();
          return;
        },
        function () {
          snapshot.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            saveFileToRealtimeDatabase(downloadURL, file);
            props.navigation.navigate("FilePreview", {
              fileData: { fileURL: downloadURL}
            })
          });
          blob.close();
          return;
        }
      );
    }
  }

  function saveFileToRealtimeDatabase(downloadURL, file) {
    let trimFileName = removeFileExtension(file.name);
    app.database().ref(`policies/${trimFileName}`).update({
      fileName: file.name,
      fileURL: downloadURL,
    });
  }

  function removeFileExtension(fileWithExtension) {
    return fileWithExtension.replace(/\.[^/.]+$/, "");
  }

  const sharePolicy = async (fileShareableURL) => {
    try {
      const result = await Share.share({
        message: fileShareableURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const alertDialog = (file) => {
    Alert.alert(
      "Delete Policy",
      "Really?",
      [
        { text: "Yes", onPress: () => deletePolicy(file) },
        {
          text: "No",
          onPress: () => console.log("Item not deleted"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  function deletePolicy(fileName) {
    let deletePolicyDatabase = app.database().ref("policies/" + removeFileExtension(fileName));
    var storage = app.storage();
    var storageRef = storage.ref();
    var policyRef = storageRef.child(`policies/${removeFileExtension(fileName)}`);
    deletePolicyDatabase.remove();
    policyRef.delete();
    setFileList([]);
    const onChildDeleted = app
      .database()
      .ref(`policies`)
      .on("child_added", (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFileList((files) => [...files, ...helperArr]);
      });
    return () => app.database().ref(`policies`).off("child_added", onChildDeleted);
  }

  useEffect(() => {
    setFileList([]);
    const onChildAdded = app
      .database()
      .ref(`policies`)
      .on("child_added", (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFileList((files) => [...files, ...helperArr]);
      });
    return () => app.database().ref(`policies`).off("child_added", onChildAdded)
  }, []);

  return (
    <ScrollView>
      <View>
        <Button title="Upload Policy" onPress={uploadImage} />
      </View>
      {progress >= 0 || progress == 1 ?
      <Progress.Bar
        width={412}
        progress={progress}
        borderRadius={0}
      /> : (null)}
      {fileList.map((item, index) => (
        <ListItem.Swipeable
          leftContent={
            <FontAwesome.Button
              name="share-alt"
              backgroundColor="#0b8fdc"
              alignItems="center"
              justifyContent="center"
              style={styles.swipeableItem}
              onPress={() => sharePolicy(item.fileURL)}
            ></FontAwesome.Button>
          }
          rightContent={
            <FontAwesome.Button
              name="trash"
              backgroundColor="#ee752e"
              alignItems="center"
              justifyContent="center"
              style={styles.swipeableItem}
              alertDialog
              onPress={() => alertDialog(item.fileName)}
            ></FontAwesome.Button>
          }
          key={index}
          onPress={() =>
            props.navigation.navigate("FilePreview", {
              fileData: item,
            })
          }
          bottomDivider
        >
          <Icon name="assignment" />
          <ListItem.Content>
            <ListItem.Title>{item.fileName}</ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
};

export default Policies;
