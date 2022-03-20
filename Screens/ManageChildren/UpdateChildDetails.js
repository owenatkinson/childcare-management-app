import React, { Component } from "react";
import { Button, View, TouchableOpacity, ScrollView, TextInput, Text } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import CheckBox from "@react-native-community/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, missingDataAlert } from "../../Components/Functionality";
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
      emergencyName: "",
      emergencyNumber: "",
      emergencyRelation: "",
      doctorName: "",
      doctorAddress: "",
      doctorNumber: "",
      childAddress: "",
      parent1Name: "",
      parent1Number: "",
      parent2Name: "",
      parent2Number: "",
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
          emergencyName: data.child_emergency_contact_name,
          emergencyNumber: data.child_emergency_contact_number,
          emergencyRelation: data.child_emergency_contact_relation,
          doctorName: data.doctor_name,
          doctorAddress: data.doctor_address,
          doctorNumber: data.doctor_number,
          childAddress: data.child_home_address,
          parent1Name: data.parent_name_1,
          parent1Number: data.parent_number_1,
          parent2Name: data.parent_name_2,
          parent2Number: data.parent_name_2,
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
    if (this.state.name.length == 0 || this.state.emergencyName.length == 0 || this.state.emergencyNumber.length == 0 || this.state.emergencyRelation.length == 0 
      || this.state.doctorName.length == 0 || this.state.doctorAddress.length == 0 || this.state.doctorNumber.length == 0 || this.state.childAddress.length == 0 
      || this.state.parent1Name.length == 0 || this.state.parent2Name.length == 0 || this.state.parent1Number.length == 0 || this.state.parent2Number.length == 0) {
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
          parent_number_2: this.state.parent2Number,
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
        <Text style={styles.bold}>Child Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Name"}
          value={this.state.name}
          onChangeText={(value) => this.inputEl(value, "name")}
        />
        <Text style={styles.bold}>Child DOB</Text>
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
        <Text style={styles.bold}>Child Allergies</Text>
        <TextInput
          style={styles.input}
          placeholder={"List Child's Allergies"}
          value={this.state.allergies}
          onChangeText={(value) => this.inputEl(value, "allergies")}
        />
        <Text style={styles.bold}>Child Allergy Details</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert details of the child's allergies"}
          value={this.state.allergiesDetails}
          onChangeText={(value) => this.inputEl(value, "allergiesDetails")}
        />
        <Text style={styles.bold}>Child Medical Conditions</Text>
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
        <Text style={styles.boldTextCheckbox}>Child Home Address</Text>
        <TextInput
          style={styles.input}
          placeholder={"Child Home Address"}
          value={this.state.childAddress}
          onChangeText={(value) => this.inputEl(value, "childAddress")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Parent #1 Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #1 Name"}
          value={this.state.parent1Name}
          onChangeText={(value) => this.inputEl(value, "parent1Name")}
        />
        <Text style={styles.bold}>Parent #1 Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #1 Number"}
          value={this.state.parent1Number}
          onChangeText={(value) => this.inputEl(value, "parent1Number")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Parent #2 Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #2 Name"}
          value={this.state.parent2Name}
          onChangeText={(value) => this.inputEl(value, "parent2Name")}
        />
        <Text style={styles.bold}>Parent #2 Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Parent #2 Number"}
          value={this.state.parent2Number}
          onChangeText={(value) => this.inputEl(value, "parent2Number")}
        />
        <View style={styles.horizontalRule}></View>
        <Text style={styles.bold}>Emergency Contact Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Name"}
          value={this.state.emergencyName}
          onChangeText={(value) => this.inputEl(value, "emergencyName")}
        />
        <Text style={styles.bold}>Emergency Contact Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Number"}
          value={this.state.emergencyNumber}
          onChangeText={(value) => this.inputEl(value, "emergencyNumber")}
        />
        <Text style={styles.bold}>Emergency Contact Relation</Text>
        <TextInput
          style={styles.input}
          placeholder={"Emergency Contact Relation"}
          value={this.state.emergencyRelation}
          onChangeText={(value) => this.inputEl(value, "emergencyRelation")}
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
        <Button title="Update" onPress={() => this.editChild()} color="#0B8FDC" />
        <View style={styles.space}></View>
      </ScrollView>
    );
  }
}
