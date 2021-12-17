import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default function LogAccidentReport() {
  const [ childName, setChildName ] = useState('');
  const [ accidentDate, setAccidentDate ] = useState('');
  const [ accidentTime, setAccidentTime ] = useState('');
  const [ accidentNotes, setAccidentNotes ] = useState('');

  const fireDB = app.firestore().collection('accidentReports');

  async function addAccidentReport() {
    await fireDB.add({
      child_name: childName,
      accident_date: accidentDate,
      accident_time: accidentTime,
      accident_notes: accidentNotes
    });
    setChildName('');
    setAccidentDate('');
    setAccidentTime('');
    setAccidentNotes('');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Child Name</Text>
        <TextInput style={styles.input} label={'Child Name'} value={childName} onChangeText={setChildName}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Date of Accident</Text>
        <TextInput style={styles.input} label={'Date of Accident'} value={accidentDate} onChangeText={setAccidentDate}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Accident Time</Text>
        <TextInput style={styles.input} label={'Accident Time'} value={accidentTime} onChangeText={setAccidentTime}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Accident Notes</Text>
        <TextInput style={styles.input} label={'Accident Notes'} value={accidentNotes} onChangeText={setAccidentNotes}/>
      <View style={styles.space}></View>
      <Button 
          title="Log Accident Report"
          onPress={() => addAccidentReport()}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  }
});