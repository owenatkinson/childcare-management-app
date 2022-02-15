import React, { useState, useEffect } from "react";
import { View, Button, Share } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import app from '../../firebase';
import "firebase/firestore";
import "firebase/database";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';

const Policies = (props) => {
  const [fileList, setFileList] = useState([]);

  async function uploadImage () {
    let file = await DocumentPicker.getDocumentAsync({});
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      }
      xhr.responseType = 'blob';
      xhr.open('GET', file.uri, true);
      xhr.send(null);
    });
  
    let trimFileName = removeFileExtension(file.name);
    const ref = app.storage().ref(`/policies/${trimFileName}`);
    const snapshot = ref.put(blob);
  
    snapshot.on('state_changed', 
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      function (error) {
        blob.close();
        return;
      },
      function () {
        snapshot.snapshot.ref.getDownloadURL().then(function(downloadURL){
          saveFileToRealtimeDatabase(downloadURL, file);
        });
        blob.close();
        return;
      }
    );
  }

  function saveFileToRealtimeDatabase(downloadURL, file){
    let trimFileName = removeFileExtension(file.name);
    app.database().ref(`policies/${trimFileName}`).update({
      fileName: file.name,
      fileURL: downloadURL,
    })
  }

  function removeFileExtension(fileWithExtension){
    return fileWithExtension.replace(/\.[^/.]+$/, "");
  }

  const sharePolicy = async (fileShareableURL) => {
    try {
      const result = await Share.share({
        message: fileShareableURL,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  function deletePolicy(fileName){
    let trimFileName = removeFileExtension(fileName);
    let deletePolicyDatabase = app.database().ref('policies/' + trimFileName);
    deletePolicyDatabase.remove();
    
    var storage = app.storage();

    var storageRef = storage.ref();

    var desertRef = storageRef.child(`policies/${trimFileName}`);

    desertRef.delete();
    setFileList([]);
    const onChildDeleted = app.database()
      .ref(`policies`)
      .on('child_added', (snapshot) => {
        let helperArr=[];
        helperArr.push(snapshot.val());
        setFileList((files)=>[...files, ...helperArr]);
      });
    return () => app.database().ref(`policies`).off('child_added', onChildDeleted);
  }

  useEffect(() => {
    setFileList([]);
    const onChildAdded = app.database()
      .ref(`policies`)
      .on('child_added', (snapshot) => {
        let helperArr=[];
        helperArr.push(snapshot.val());
        setFileList((files)=>[...files, ...helperArr]);
      });
    return () => app.database().ref(`policies`).off('child_added', onChildAdded);
  },[])

  return (
    <ScrollView>
      <View>
          <Button 
            title="Upload Policy"
            onPress={uploadImage}
          />
      </View>
      {fileList.map((item, index) => (
        <ListItem.Swipeable
          leftContent={
            <FontAwesome.Button name="share-alt" backgroundColor="#0b8fdc" alignItems="center" justifyContent="center" style={{height:55}} onPress={() => sharePolicy(item.fileURL)}></FontAwesome.Button>
          }
          rightContent={
            <FontAwesome.Button name="trash" backgroundColor="#ee752e" alignItems="center" justifyContent="center" style={{height:55}} onPress={() => deletePolicy(item.fileName)}></FontAwesome.Button>
          }
          key = {index}
          onPress={() =>
            props.navigation.navigate('FilePreview', {
              fileData: item,
            })
          }bottomDivider>
          <Icon name='assignment' />
          <ListItem.Content>
            <ListItem.Title>{item.fileName}</ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
};

export default Policies;