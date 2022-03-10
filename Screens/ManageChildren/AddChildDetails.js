import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../Styles/general');

export default function AddNewChild({ navigation }) {
  const [ childName, setChildName ] = useState('');
  const childDOB = useInput(new Date());
  const [ childAllergies, setChildAllergies ] = useState('');
  const [ childAllergiesDetails, setChildAllergiesDetails ] = useState('');
  const [ childMedicalConditions, setChildMedicalConditions ] = useState('');
  const [ childMedicalConditionsDetails, setChildMedicalConditionsDetails ] = useState('');
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

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  async function addChild() {
    await fireDB.add({
      child_name: childName,
      child_DOB: convertDate(childDOB.date),
      child_allergies: childAllergies,
      child_allergies_details: childAllergiesDetails,
      child_medical_conditions: childMedicalConditions,
      child_medical_conditions_details: childMedicalConditionsDetails,
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
        <TextInput style={styles.input} placeholder={'Child Name'} label={'Child Name'} value={childName} onChangeText={setChildName}/>
        <Text style={styles.bold}>Child DOB</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={childDOB.showDatepicker}>
          {childDOB.show && (
            <DateTimePicker
            testID="childDOB"
            value={childDOB.date}
            mode={childDOB.mode}
            is24Hour={true}
            display="default"
            onChange={childDOB.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Date: {convertDate(childDOB.date)}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Child Allergies</Text>
        <TextInput style={styles.input} placeholder={'List Child\'s Allergies'} value={childAllergies} onChangeText={setChildAllergies}/>
        <Text style={styles.bold}>Allergy Details</Text>
        <TextInput multiline={true} numberOfLines={4} style={styles.extendedInput} placeholder={'Insert details of the child\'s allergies'} value={childAllergiesDetails} onChangeText={setChildAllergiesDetails}/>
        <Text style={styles.bold}>Child Medical Conditions</Text>
        <TextInput style={styles.input} placeholder={'List Child\'s Medical Conditions'} value={childMedicalConditions} onChangeText={setChildMedicalConditions}/>
        <Text style={styles.bold}>Medical Condition Details</Text>
        <TextInput multiline={true} numberOfLines={4} style={styles.extendedInput} placeholder={'Insert details of the child\'s medical conditions'} value={childMedicalConditionsDetails} onChangeText={setChildMedicalConditionsDetails}/>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Child is actively under your care:</Text>
          <CheckBox
            style={styles.checkBox}
            disabled={false}
            value={childIsActive}
            onValueChange={setChildIsActive}
            tintColors={{ true: "#0B8FDC", false: "orange"}}
          />
        </View>
        <Text style={styles.boldTextCheckbox}>Child's Home Address</Text>
        <TextInput style={styles.input} placeholder={'Child\'s Home Address'} value={childHomeAddress} onChangeText={setChildHomeAddress}/>
        <Text style={styles.bold}>Parent #1 Name</Text>
        <TextInput style={styles.input} placeholder={'Parent Name'} value={parentName1} onChangeText={setParentName1}/>
        <Text style={styles.bold}>Parent #1 Phone Number</Text>
        <TextInput style={styles.input} placeholder={'Parent Phone Number'} value={parentNumber1} onChangeText={setParentNumber1}/>
        <Text style={styles.bold}>Parent #2 Name</Text>
        <TextInput style={styles.input} placeholder={'Parent Name'} value={parentName2} onChangeText={setParentName2}/>
        <Text style={styles.bold}>Parent #2 Phone Number</Text>
        <TextInput style={styles.input} placeholder={'Parent Phone Number'} value={parentNumber2} onChangeText={setParentNumber2}/>
        <Text style={styles.bold}>Emergency Contact Name</Text>
        <TextInput style={styles.input} placeholder={'Emergency Contact Name'} value={childEmergencyContactName} onChangeText={setChildEmergencyContactName}/>
        <Text style={styles.bold}>Emergency Contact Phone Number</Text>
        <TextInput style={styles.input} placeholder={'Emergency Contact Phone Number'} value={childEmergencyNumber} onChangeText={setChildEmergencyNumber}/>
        <Text style={styles.bold}>Emergency Contact Relation</Text>
        <TextInput style={styles.input} placeholder={'Relation to Child'} value={childEmergencyRelation} onChangeText={setChildEmergencyRelation}/>
        <Text style={styles.bold}>Doctor's Name</Text>
        <TextInput style={styles.input} placeholder={'Name of Doctor'} value={doctorName} onChangeText={setDoctorName}/>
        <Text style={styles.bold}>Doctor's Address</Text>
        <TextInput style={styles.input} placeholder={'Address of Doctor\s Practice'} value={doctorAddress} onChangeText={setDoctorAddress}/>
        <Text style={styles.bold}>Doctor's Phone Number</Text>
        <TextInput style={styles.input} placeholder={'Doctor\'s Phone Number'} value={doctorNumber} onChangeText={setDoctorNumber}/>
      <View style={styles.space}></View>
      <Button 
          title="Add Child"
          onPress={() => addChild()}
        />
    </ScrollView>
  );
}

function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
  };
  const showDatepicker = () => {
      showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  }
  return {
      date,
      showDatepicker,
      showTimepicker,
      show,
      mode,
      onChange
  }
}