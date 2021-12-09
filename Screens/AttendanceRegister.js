import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text } from 'react-native';
import app from '../firebase';
import "firebase/firestore";

function children() {
  const [ kidname, setKidname ] = useState('');
  const fireDB = app.firestore().collection('children');

  async function addChild() {
    await fireDB.add({
      childname: kidname
    });
    setTodo('');
  }

  return (
    <View>
      <ScrollView style={{flex: 1}}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={'Child Name'} value={kidname} onChangeText={setKidname}/>
      <Button 
          title="Add Child"
          onPress={() => addChild()}
        />
    </View>
  );
}

export default children;