import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddNewChild({ navigation }) {
  const [ childName, setChildName ] = useState('');
  const [ childDOB, setChildDOB ] = useState(new Date());
  const [ childAllergies, setChildAllergies ] = useState('');
  const [ childIsActive, setChildIsActive ] = useState('');
  const [ childEmergencyContactName, setChildEmergencyContactName ] = useState('');
  const [ childEmergencyNumber, setChildEmergencyNumber ] = useState('');
  const [ childEmergencyRelation, setChildEmergencyRelation ] = useState('');
  const [ doctorName, setDoctorName ] = useState('');
  const [ doctorAddress, setDoctorAddress ] = useState('');
  const [ doctorNumber, setDoctorNumber ] = useState('');
  const [ childHomeAddress, setChildHomeAddress ] = useState('');
  const [ parentNumber1, setParentNumber1 ] = useState('');
  const [ parentName1, setParentName1 ] = useState('');
  const [ parentNumber2, setParentNumber2 ] = useState('');
  const [ parentName2, setParentName2 ] = useState('');
  const fireDB = app.firestore().collection('children');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || childDOB;
    setShow(Platform.OS === 'ios');
    setChildDOB(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  async function addChild() {
    await fireDB.add({
      child_name: childName,
      child_DOB: convertDate(childDOB),
      child_allergies: childAllergies,
      child_is_active: childIsActive,
      child_emergency_contact_name: childEmergencyContactName,
      child_emergency_contact_number: childEmergencyNumber,
      child_emergency_contact_relation: childEmergencyRelation,
      doctor_name: doctorName,
      doctor_address: doctorAddress,
      doctor_number: doctorNumber,
      child_home_address: childHomeAddress,
      parent_number_1: parentNumber1,
      parent_name_1: parentName1,
      parent_number_2: parentNumber2,
      parent_name_2: parentName2
    });
    navigation.navigate('ManageChildren');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Child Name</Text>
        <TextInput style={styles.input} label={'Child Name'} value={childName} onChangeText={setChildName}/>
        <Text style={styles.bold}>Child DOB</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          {childDOB.show && (
              <DateTimePicker
              testID="dateOfAccident"
              value={childDOB.date}
              mode={childDOB.mode}
              is24Hour={true}
              display="default"
              onChange={childDOB.onChange}
              />
          )}
          <Text>Choose a Date: {convertDate(childDOB.date)}</Text>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={childDOB}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.bold}>Child Allergies</Text>
        <TextInput style={styles.input} label={'Child Allergies'} value={childAllergies} onChangeText={setChildAllergies}/>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text style={styles.bold}>Child Is Active?</Text>
          <CheckBox
            style={{marginTop:15}}
            disabled={false}
            value={childIsActive}
            onValueChange={setChildIsActive}
            tintColors={{ true: "#0B8FDC", false: "orange"}}
          />
        </View>
        <Text style={styles.boldUnderCheckbox}>Child Home Address</Text>
        <TextInput style={styles.input} label={'Child Home Address'} value={childHomeAddress} onChangeText={setChildHomeAddress}/>
        <Text style={styles.bold}>Parent #1 Name</Text>
        <TextInput style={styles.input} label={'Parent #1 Name'} value={parentName1} onChangeText={setParentName1}/>
        <Text style={styles.bold}>Parent #1 Phone Number</Text>
        <TextInput style={styles.input} label={'Parent #1 Phone Number'} value={parentNumber1} onChangeText={setParentNumber1}/>
        <Text style={styles.bold}>Parent #2 Name</Text>
        <TextInput style={styles.input} label={'Parent #2 Name'} value={parentName2} onChangeText={setParentName2}/>
        <Text style={styles.bold}>Parent #2 Phone Number</Text>
        <TextInput style={styles.input} label={'Parent #2 Phone Number'} value={parentNumber2} onChangeText={setParentNumber2}/>
        <Text style={styles.bold}>Emergency Contact Name</Text>
        <TextInput style={styles.input} label={'Emergency Contact Name'} value={childEmergencyContactName} onChangeText={setChildEmergencyContactName}/>
        <Text style={styles.bold}>Emergency Contact Number</Text>
        <TextInput style={styles.input} label={'Emergency Contact Number'} value={childEmergencyNumber} onChangeText={setChildEmergencyNumber}/>
        <Text style={styles.bold}>Emergency Contact Relation</Text>
        <TextInput style={styles.input} label={'Emergency Contact Relation'} value={childEmergencyRelation} onChangeText={setChildEmergencyRelation}/>
        <Text style={styles.bold}>Doctor's Name</Text>
        <TextInput style={styles.input} label={'Doctor\'s Name'} value={doctorName} onChangeText={setDoctorName}/>
        <Text style={styles.bold}>Doctor's Address</Text>
        <TextInput style={styles.input} label={'Doctor\'s Address'} value={doctorAddress} onChangeText={setDoctorAddress}/>
        <Text style={styles.bold}>Doctor's Number</Text>
        <TextInput style={styles.input} label={'Doctors\'s Number'} value={doctorNumber} onChangeText={setDoctorNumber}/>
      <View style={styles.space}></View>
      <Button 
          title="Add Child"
          onPress={() => addChild()}
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
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 15
  },
  boldUnderCheckbox: {
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 20
  },
  space: {
    height: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: '#DADADA',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height: 40
  },
});