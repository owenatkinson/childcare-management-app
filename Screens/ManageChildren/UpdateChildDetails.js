import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import CheckBox from "@react-native-community/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, missingDataAlert, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class UpdateChildDetails extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: "",
      dob: "",
      allergies: "",
      allergiesDetails: "",
      medicalConditions: "",
      medicalConditionsDetails: "",
      isActive: "",
      emergencyName1: "",
      emergencyNumber1: "",
      emergencyRelation1: "",
      emergencyName2: "",
      emergencyNumber2: "",
      emergencyRelation2: "",
      emergencyName3: "",
      emergencyNumber3: "",
      emergencyRelation3: "",
      doctorName: "",
      doctorAddress: "",
      doctorNumber: "",
      childAddress: "",
      date: new Date(),
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dob: convertDate(currentDate),
      show: false,
    });
  };

  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    const documentReference = app.firestore().collection("children").doc(this.props.route.params.userkey);
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          name: data.child_name,
          dob: data.child_DOB,
          allergies: data.child_allergies,
          allergiesDetails: data.child_allergies_details,
          medicalConditions: data.child_medical_conditions,
          medicalConditionsDetails: data.child_medical_conditions_details,
          isActive: data.child_is_active,
          emergencyName1: data.child_emergency_contact_name_1,
          emergencyNumber1: data.child_emergency_contact_number_1,
          emergencyRelation1: data.child_emergency_contact_relation_1,
          emergencyName2: data.child_emergency_contact_name_2,
          emergencyNumber2: data.child_emergency_contact_number_2,
          emergencyRelation2: data.child_emergency_contact_relation_2,
          emergencyName3: data.child_emergency_contact_name_3,
          emergencyNumber3: data.child_emergency_contact_number_3,
          emergencyRelation3: data.child_emergency_contact_relation_3,
          doctorName: data.doctor_name,
          doctorAddress: data.doctor_address,
          doctorNumber: data.doctor_number,
          childAddress: data.child_home_address,
          isLoading: false,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  editChild() {
    if (isInputEmpty(this.state.name) || isInputEmpty(this.state.emergencyName1) || isInputEmpty(this.state.emergencyNumber1) || isInputEmpty(this.state.emergencyRelation1) 
      || isInputEmpty(this.state.doctorName) || isInputEmpty(this.state.doctorAddress) || isInputEmpty(this.state.doctorNumber) || isInputEmpty(this.state.childAddress) 
      || isInputEmpty(this.state.emergencyName2) || isInputEmpty(this.state.emergencyNumber2) || isInputEmpty(this.state.emergencyRelation2) || isInputEmpty(this.state.emergencyName3)
      || isInputEmpty(this.state.emergencyNumber3) || isInputEmpty(this.state.emergencyRelation3)) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      const documentUpdate = app.firestore().collection("children").doc(this.state.key);
      documentUpdate
        .set({
          child_name: this.state.name,
          child_DOB: this.state.dob,
          child_allergies: this.state.allergies,
          child_allergies_details: this.state.allergiesDetails,
          child_medical_conditions: this.state.medicalConditions,
          child_medical_conditions_details: this.state.medicalConditionsDetails,
          child_is_active: this.state.isActive,
          child_emergency_contact_name_1: this.state.emergencyName1,
          child_emergency_contact_number_1: this.state.emergencyNumber1,
          child_emergency_contact_relation_1: this.state.emergencyRelation1,
          child_emergency_contact_name_2: this.state.emergencyName2,
          child_emergency_contact_number_2: this.state.emergencyNumber2,
          child_emergency_contact_relation_2: this.state.emergencyRelation2,
          child_emergency_contact_name_3: this.state.emergencyName3,
          child_emergency_contact_number_3: this.state.emergencyNumber3,
          child_emergency_contact_relation_3: this.state.emergencyRelation3,
          doctor_name: this.state.doctorName,
          doctor_address: this.state.doctorAddress,
          doctor_number: this.state.doctorNumber,
          child_home_address: this.state.childAddress
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ManageChildren");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Child's Name: {this.state.name}</Text>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Child's Date of Birth</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
            {this.state.show && (
              <DateTimePicker
                maximumDate={new Date()}
                value={this.state.date}
                mode="date"
                onChange={this.onChange}
              />
            )}
            <Text style={styles.buttonText}>Choose a Date: {this.state.dob}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Child's Allergies</Text>
        <TextInput
          style={styles.input}
          placeholder={"List Child's Allergies"}
          value={this.state.allergies}
          onChangeText={(value) => this.inputEl(value, "allergies")}
        />
        <Text style={styles.bold}>Allergy Details</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert details of the child's allergies"}
          value={this.state.allergiesDetails}
          onChangeText={(value) => this.inputEl(value, "allergiesDetails")}
        />
        <Text style={styles.bold}>Child's Medical Conditions</Text>
        <TextInput
          style={styles.input}
          placeholder={"List Child's Medical Conditions"}
          value={this.state.medicalConditions}
          onChangeText={(value) => this.inputEl(value, "medicalConditions")}
        />
        <Text style={styles.bold}>Medical Condition Details</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert details of the child's medical conditions"}
          value={this.state.medicalConditionsDetails}
          onChangeText={(value) => this.inputEl(value, "medicalConditionsDetails")}
        />
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Child is actively under your care:</Text>
          <CheckBox
            style={styles.checkBox}
            disabled={false}
            value={this.state.isActive}
            onValueChange={(value) => this.inputEl(value, "isActive")}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <Text style={styles.boldTextCheckbox}>Child's Home Address</Text>
        <TextInput
          style={styles.input}
          placeholder={"Child Home Address"}
          value={this.state.childAddress}
          onChangeText={(value) => this.inputEl(value, "childAddress")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Emergency Contact 1</Text>
        <Text style={styles.bold}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Name"}
          value={this.state.emergencyName1}
          onChangeText={(value) => this.inputEl(value, "emergencyName1")}
        />
        <Text style={styles.bold}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Number"}
          value={this.state.emergencyNumber1}
          onChangeText={(value) => this.inputEl(value, "emergencyNumber1")}
        />
        <Text style={styles.bold}>Emergency Contact Relation</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Relation"}
          value={this.state.emergencyRelation1}
          onChangeText={(value) => this.inputEl(value, "emergencyRelation1")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Emergency Contact 2</Text>
        <Text style={styles.bold}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #2 Name"}
          value={this.state.emergencyName2}
          onChangeText={(value) => this.inputEl(value, "emergencyName2")}
        />
        <Text style={styles.bold}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #2 Number"}
          value={this.state.emergencyNumber2}
          onChangeText={(value) => this.inputEl(value, "emergencyNumber2")}
        />
        <Text style={styles.bold}>Relation</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Relation"}
          value={this.state.emergencyRelation2}
          onChangeText={(value) => this.inputEl(value, "emergencyRelation2")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Emergency Contact 3</Text>
        <Text style={styles.bold}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Name"}
          value={this.state.emergencyName3}
          onChangeText={(value) => this.inputEl(value, "emergencyName3")}
        />
        <Text style={styles.bold}>Emergency Contact Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Number"}
          value={this.state.emergencyNumber3}
          onChangeText={(value) => this.inputEl(value, "emergencyNumber3")}
        />
        <Text style={styles.bold}>Emergency Contact Relation</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Relation"}
          value={this.state.emergencyRelation3}
          onChangeText={(value) => this.inputEl(value, "emergencyRelation3")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Doctor's Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Doctor's Name"}
          value={this.state.doctorName}
          onChangeText={(value) => this.inputEl(value, "doctorName")}
        />
        <Text style={styles.bold}>Doctor's Address</Text>
        <TextInput
          style={styles.input}
          placeholder={"Doctor's Address"}
          value={this.state.doctorAddress}
          onChangeText={(value) => this.inputEl(value, "doctorAddress")}
        />
        <Text style={styles.bold}>Doctor's Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Doctor's Number"}
          value={this.state.doctorNumber}
          onChangeText={(value) => this.inputEl(value, "doctorNumber")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => this.editChild()}>
          <Text style={styles.buttonTextMenu}>Update</Text>
        </Button>
        <View style={styles.submitButtonSpace}></View>
      </ScrollView>
    );
  }
}
