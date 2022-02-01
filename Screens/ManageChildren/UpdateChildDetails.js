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
      childAddress: '',
      parent1Name: '',
      parent1Number: '',
      parent2Name: '',
      parent2Number: ''
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
          childAddress: user.child_home_address,
          parent1Name: user.parent_name_1,
          parent1Number: user.parent_number_1,
          parent2Name: user.parent_name_2,
          parent2Number: user.parent_name_2,
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
      doctor_number: this.state.doctorNumber,
      child_home_address: this.state.childAddress,
      parent_name_1: this.state.parent1Name,
      parent_name_2: this.state.parent2Name,
      parent_number_1: this.state.parent1Number,
      parent_number_2: this.state.parent2Number
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
        childAddress: '',
        parent1Name: '',
        parent2Name: '',
        parent1Number: '',
        parent2Number: '',
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.bold}>Child Is Active?</Text>
            <CheckBox
              style={{marginTop:15}}
              disabled={false}
              value={this.state.isActive}
              onValueChange={(val) => this.inputEl(val, 'isActive')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <Text style={styles.boldUnderCheckbox}>Child Home Address</Text>
          <TextInput
              style={styles.input}
              placeholder={'Child Home Address'}
              value={this.state.childAddress}
              onChangeText={(val) => this.inputEl(val, 'childAddress')}
          />
          <Text style={styles.bold}>Parent #1 Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Parent #1 Name'}
              value={this.state.parent1Name}
              onChangeText={(val) => this.inputEl(val, 'parent1Name')}
          />
          <Text style={styles.bold}>Parent #1 Number</Text>
          <TextInput
              style={styles.input}
              placeholder={'Parent #1 Number'}
              value={this.state.parent1Number}
              onChangeText={(val) => this.inputEl(val, 'parent1Number')}
          />
         <Text style={styles.bold}>Parent #2 Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Parent #2 Name'}
              value={this.state.parent2Name}
              onChangeText={(val) => this.inputEl(val, 'parent2Name')}
          />
          <Text style={styles.bold}>Parent #2 Number</Text>
          <TextInput
              style={styles.input}
              placeholder={'Parent #2 Number'}
              value={this.state.parent2Number}
              onChangeText={(val) => this.inputEl(val, 'parent2Number')}
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
  }
})