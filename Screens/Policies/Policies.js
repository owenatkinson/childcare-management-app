import React, { useState, useEffect } from "react";
import { View, Button, Text, Linking } from "react-native";
import { ListItem } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import app from '../../firebase';
import "firebase/firestore";
import "firebase/database";
import PDFReader from 'rn-pdf-reader-js';
import { ScrollView } from "react-native-gesture-handler";

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
  
    const ref = app.storage().ref(`/policies/${file.name}`);
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
    const uniqueKey = app.database().ref().push().key;
    app.database().ref(`policies/${uniqueKey}`).update({
      fileName: file.name,
      fileURL: downloadURL,
    })
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
        <ListItem
          key = {index}
          onPress={() =>
            props.navigation.navigate('FilePreview', {
              fileData: item,
            })
          }>
          <ListItem.Content>
            <ListItem.Title>{item.fileName}</ListItem.Title>
            {/* <ListItem.Subtitle>Subtitle</ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default Policies;