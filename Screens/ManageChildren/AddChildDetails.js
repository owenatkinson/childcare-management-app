import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

function AddNewChild() {
  const [ childForename, setChildForename ] = useState('');
  const [ childSurname, setChildSurname ] = useState('');
  const [ childDOB, setChildDOB ] = useState('');
  const [ childAllergies, setChildAllergies ] = useState('');
  const [ childIsActive, setChildIsActive ] = useState('');
  const [ childEmergencyContactName, setChildEmergencyContactName ] = useState('');
  const [ childEmergencyNumber, setChildEmergencyNumber ] = useState('');
  const [ childEmergencyRelation, setChildEmergencyRelation ] = useState('');

  const fireDB = app.firestore().collection('children');

  async function addChild() {
    await fireDB.add({
      child_forename: childForename,
      child_surname: childSurname,
      child_DOB: childDOB,
      child_allergies: childAllergies,
      child_is_active: childIsActive,
      child_emergency_contact_name: childEmergencyContactName,
      child_emergency_contact_number: childEmergencyNumber,
      child_emergency_contact_relation: childEmergencyRelation
    });
    setChildForename('');
    setChildSurname('');
    setChildDOB('');
    setChildAllergies('');
    setChildIsActive('');
    setChildEmergencyContactName('');
    setChildEmergencyNumber('');
    setChildEmergencyRelation('');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child Forename</Text>
      <TextInput style={styles.input} label={'Child Forename'} value={childForename} onChangeText={setChildForename}/>
      <Text style={styles.bold}>Child Surname</Text>
      <TextInput style={styles.input} label={'Child Surname'} value={childSurname} onChangeText={setChildSurname}/>
      <Text style={styles.bold}>Child DOB</Text>
      <TextInput style={styles.input} label={'Child DOB'} value={childDOB} onChangeText={setChildDOB}/>
      <Text style={styles.bold}>Child Allergies</Text>
      <TextInput style={styles.input} label={'Child Allergies'} value={childAllergies} onChangeText={setChildAllergies}/>
      <Text style={styles.bold}>Child Is Active?</Text>
      <TextInput style={styles.input} label={'Child Is Active'} value={childIsActive} onChangeText={setChildIsActive}/>
      <Text style={styles.bold}>Emergency Contact Name</Text>
      <TextInput style={styles.input} label={'Emergency Contact Name'} value={childEmergencyContactName} onChangeText={setChildEmergencyContactName}/>
      <Text style={styles.bold}>Emergency Contact Number</Text>
      <TextInput style={styles.input} label={'Emergency Contact Number'} value={childEmergencyNumber} onChangeText={setChildEmergencyNumber}/>
      <Text style={styles.bold}>Emergency Contact Relation</Text>
      <TextInput style={styles.input} label={'Emergency Contact Relation'} value={childEmergencyRelation} onChangeText={setChildEmergencyRelation}/>
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
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  }
});

export default AddNewChild;