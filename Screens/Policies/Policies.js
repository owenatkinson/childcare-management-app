import React, { useState, useEffect } from "react";
import { View, Share, Alert, ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";
import { ListItem, Icon } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import app from "../../Components/firebase";
import "firebase/firestore";
import "firebase/database";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
const styles = require("../../Styles/general");

// props parameter used for navigation to a new page
const Policies = (props) => {
  // Initialising the state value of variables
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(-1);

  async function uploadImage() {
    // Launch document picker
    let file = await DocumentPicker.getDocumentAsync({});
    // Use a blob to store XML information regarding the document being uploaded
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

      // Provide firebase storage location to store the document
      const ref = app.storage().ref(`/policies/${removeFileExtension(file.name)}`);
      const snapshot = ref.put(blob);

      snapshot.on(
        "state_changed",
        // Next callback monitors the progress of the document upload to firebase storage
        function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          setProgress(progress);
          if(progress == 1) {
            setProgress(-1);
          }
        },
        // Error callback used to capture error
        function (error) {
          console.log(error);
          blob.close();
          return;
        },
        // Complete callback used save the document to firebase realtime database and navigate to the FilePreview page, passing the downloadURL as fileData.fileURL variable
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

  // Saving to firebase realtime database is required to acquire a URL for opening & sharing the document
  function saveFileToRealtimeDatabase(downloadURL, file) {
    let trimFileName = removeFileExtension(file.name);
    app.database().ref(`policies/${trimFileName}`).update({
      fileName: file.name,
      fileURL: downloadURL,
    });
  }

  // Trim the filename into an appropriate format to be stored on firebase realtime database
  function removeFileExtension(fileWithExtension) {
    return fileWithExtension.replace(/\.[^/.]+$/, "");
  }

  // Using Share to provide a feature that opens the device's sharing component
  const sharePolicy = async (fileShareableURL) => {
    try {
      const result = await Share.share({
        message: fileShareableURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Display alert to confirm if the user wants to delete the policy from the system
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
    // Delete the policy from the firebase realtime database
    deletePolicyDatabase.remove();
    // Delete the policy from the firebase storage container
    policyRef.delete();
    setFileList([]);
    // Refresh the list of policies
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
    // Refresh the list of policies
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
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={uploadImage}>
          <Text style={styles.buttonTextMenu}>Upload Policy</Text>
        </Button>
      </View>
      {/* If a policy upload is in progress, display a progress bar showing its progress */}
      {progress >= 0 || progress == 1 ?
      <Progress.Bar
        width={412}
        progress={progress}
        borderRadius={0}
      /> : (null)}
      {/* Display a list of all policies stored within the database */}
      {fileList.map((item, index) => (
        <ListItem.Swipeable
          // Swipeable component that reveals an option to share the policy
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
          // Swipeable component that reveals an option to delete the policy
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
            // Pressing on the file's ListItem component will navigate the user to the FilePreview page and display the selected policy through passing the fileData variable
            props.navigation.navigate("FilePreview", {
              fileData: item,
            })
          }
          bottomDivider
        >
          <Icon name="assignment" />
          <ListItem.Content>
            <ListItem.Title style={styles.navyStandardText}>{item.fileName}</ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
};

export default Policies;
