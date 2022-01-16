import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default function LogVisitor({navigation}) {
  const [ visitorName, setVisitorName ] = useState('');
  const [ dateOfVisit, setDateOfVisit ] = useState('');
  const [ timeIn, setTimeIn ] = useState('');
  const [ timeOut, setTimeOut ] = useState('');
  const [ visitPurpose, setVisitPurpose ] = useState('');

  const fireDB = app.firestore().collection('visitorLogs');

  async function addVisitorLog() {
    await fireDB.add({
      visitor_name: visitorName,
      date_of_visit: dateOfVisit,
      time_in: timeIn,
      time_out: timeOut,
      visit_purpose: visitPurpose
    });
    navigation.navigate('VisitorLogs');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Visitor Name</Text>
        <TextInput style={styles.input} label={'Visitor Name'} value={visitorName} onChangeText={setVisitorName}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Date of Visit</Text>
        <TextInput style={styles.input} label={'Date of Visit'} value={dateOfVisit} onChangeText={setDateOfVisit}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Time In</Text>
        <TextInput style={styles.input} label={'Time In'} value={timeIn} onChangeText={setTimeIn}/>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Time Out</Text>
        <TextInput style={styles.input} label={'Time Out'} value={timeOut} onChangeText={setTimeOut}/>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Purpose of Visit</Text>
        <TextInput style={styles.input} label={'Purpose of Visit'} value={visitPurpose} onChangeText={setVisitPurpose}/>
      <View style={styles.space}></View>
      <Button 
          title="Log Visitor"
          onPress={() => addVisitorLog()}
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