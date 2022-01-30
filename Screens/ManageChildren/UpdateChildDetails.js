import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import CheckBox from '@react-native-community/checkbox';

export default class UpdateChildDetails extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
      dob: '',
      allergies: '',
      isActive: '',
      emergencyName: '',
      emergencyNumber: '',
      emergencyRelation: '',
      doctorName: '',
      doctorAddress: '',
      doctorNumber: '',
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('children').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.child_name,
          dob: user.child_DOB,
          allergies: user.child_allergies,
          isActive: user.child_is_active,
          emergencyName: user.child_emergency_contact_name,
          emergencyNumber: user.child_emergency_contact_number,
          emergencyRelation: user.child_emergency_contact_relation,
          doctorName: user.doctor_name,
          doctorAddress: user.doctor_address,
          doctorNumber: user.doctor_number,
          isLoading: false
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  editChild() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('children').doc(this.state.key);
    docUpdate.set({
      child_name: this.state.name,
      child_DOB: this.state.dob,
      child_allergies: this.state.allergies,
      child_is_active: this.state.isActive,
      child_emergency_contact_name: this.state.emergencyName,
      child_emergency_contact_number: this.state.emergencyNumber,
      child_emergency_contact_relation: this.state.emergencyRelation,
      doctor_name: this.state.doctorName,
      doctor_address: this.state.doctorAddress,
      doctor_number: this.state.doctorNumber
    }).then(() => {
      this.setState({
        key: '',
        name: '',
        isActive: '',
        emergencyName: '',
        emergencyNumber: '',
        emergencyRelation: '',
        doctorName: '',
        doctorAddress: '',
        doctorNumber: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ManageChildren');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.space}></View>
          <Text style={styles.bold}>Child Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputEl(val, 'name')}
          />
          <Text style={styles.bold}>Child DOB</Text>
          <TextInput
              style={styles.input}
              placeholder={'Date of Birth'}
              value={this.state.dob}
              onChangeText={(val) => this.inputEl(val, 'dob')}
          />
          <Text style={styles.bold}>Child Allergies</Text>
          <TextInput
              style={styles.input}
              placeholder={'Child Allergies'}
              value={this.state.allergies}
              onChangeText={(val) => this.inputEl(val, 'allergies')}
          />
          <Text style={styles.bold}>Child Is Active?</Text>
          <CheckBox
            disabled={false}
            value={this.state.isActive}
            onValueChange={(val) => this.inputEl(val, 'isActive')}
            tintColors={{ true: "#0B8FDC", false: "orange"}}
          />
          <Text style={styles.bold}>Emergency Contact Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Emergency Contact Name'}
              value={this.state.emergencyName}
              onChangeText={(val) => this.inputEl(val, 'emergencyName')}
          />
          <Text style={styles.bold}>Emergency Contact Number</Text>
          <TextInput
              style={styles.input}
              placeholder={'Emergency Contact Number'}
              value={this.state.emergencyNumber}
              onChangeText={(val) => this.inputEl(val, 'emergencyNumber')}
          />
          <Text style={styles.bold}>Emergency Contact Relation</Text>
          <TextInput
              style={styles.input}
              placeholder={'Emergency Contact Relation'}
              value={this.state.emergencyRelation}
              onChangeText={(val) => this.inputEl(val, 'emergencyRelation')}
          />
          <Text style={styles.bold}>Doctor's Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Doctor\'s Name'}
              value={this.state.doctorName}
              onChangeText={(val) => this.inputEl(val, 'doctorName')}
          />
          <Text style={styles.bold}>Doctor's Address</Text>
          <TextInput
              style={styles.input}
              placeholder={'Doctor\'s Address'}
              value={this.state.doctorAddress}
              onChangeText={(val) => this.inputEl(val, 'doctorAddress')}
          />
          <Text style={styles.bold}>Doctor's Number</Text>
          <TextInput
              style={styles.input}
              placeholder={'Doctor\'s Number'}
              value={this.state.doctorNumber}
              onChangeText={(val) => this.inputEl(val, 'doctorNumber')}
          />
          <View style={styles.space}></View>
          <Button
            title='Update'
            onPress={() => this.editChild()} 
            color="#0B8FDC"
          />
          <View style={styles.space}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  }
})