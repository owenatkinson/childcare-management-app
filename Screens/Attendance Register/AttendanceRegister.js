import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import CheckBox from '@react-native-community/checkbox';

function AttendanceRegister({ navigation }) {
  const [ additionalNotes, setAdditionalNotes ] = useState('');
  const [ checkInTime, setCheckInTime ] = useState('');
  const [ checkOutTime, setCheckOutTime ] = useState('');
  const [ childName, setChildName ] = useState('');
  const [ collectedBy, setCollectedBy ] = useState('');
  const [ dateOfAttendance, setDateOfAttendance ] = useState('');
  const [ droppedBy, setDroppedBy ] = useState('');
  const [ meals, setMeals ] = useState('');
  const [ temperatureChecked, setTemperatureChecked ] = useState('');

  const fireDB = app.firestore().collection('attendanceRegister');

  async function addAttendanceLog() {
    await fireDB.add({
      additional_notes: additionalNotes,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      child_name: childName,
      collected_by: collectedBy,
      date_of_attendance: dateOfAttendance,
      dropped_by: droppedBy,
      meals_: meals,
      temperature_checked: temperatureChecked
    });
    navigation.navigate('Home');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child Name</Text>
      <TextInput style={styles.input} label={'Child Name'} value={childName} onChangeText={setChildName}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Date of Attendance</Text>
      <TextInput style={styles.input} label={'Date of Attendance'} value={dateOfAttendance} onChangeText={setDateOfAttendance}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Check In Time</Text>
      <TextInput style={styles.input} label={'Check In Time'} value={checkInTime} onChangeText={setCheckInTime}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Check Out Time</Text>
      <TextInput style={styles.input} label={'Check Out Time'} value={checkOutTime} onChangeText={setCheckOutTime}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Dropped By</Text>
      <TextInput style={styles.input} label={'Dropped By'} value={droppedBy} onChangeText={setDroppedBy}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Collected By</Text>
      <TextInput style={styles.input} label={'Collected By'} value={collectedBy} onChangeText={setCollectedBy}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Temperature Checked</Text>
      <CheckBox
        disabled={false}
        value={temperatureChecked}
        onValueChange={setTemperatureChecked}
        tintColors={{ true: "#0B8FDC", false: "orange"}}
      />
      <View style={styles.space}></View>
      <Text style={styles.bold}>Meals</Text>
      <TextInput style={styles.input} label={'Meals'} value={meals} onChangeText={setMeals}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput style={styles.input} label={'Additional Notes'} value={additionalNotes} onChangeText={setAdditionalNotes}/>
      <View style={styles.space}></View>
      <Button 
          title="Log Attendance"
          onPress={() => addAttendanceLog()}
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

export default AttendanceRegister;