import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, parseDate, convertToTimestamp, missingDataAlert, invalidTimeAlert, isValidTime, isInputEmpty } from "../../Components/Functionality";
import ModalSelector from "react-native-modal-selector";
const styles = require("../../Styles/general");

export default class UpdateMedicineLog extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      childName: "",
      medicineDate: new Date(),
      medicineTitle: "",
      medicineTime: "",
      medicineReason: "",
      medicineNotes: "",
      date: new Date(),
      childNames: [],
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      medicineDate: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads medicine data from the database into the page
  componentDidMount() {
    const childNames = [];
    let index = 0;

    // Query the database to gather names of all children and store these names in childNames array
    app
    .firestore()
    .collection("children")
    .orderBy("child_name", "asc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        childNames.push({
          key: index++,
          label: document.data()["child_name"],
        });
      });
      this.setState({
        childNames: childNames,
      });
    });
    // Query the database to gather medicine log data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("medicineAdministration")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          childName: data.child_name,
          medicineDate: parseDate(data.medicine_date),
          medicineTitle: data.medicine_title,
          medicineTime: data.medicine_time,
          medicineReason: data.medicine_reason,
          medicineNotes: data.medicine_notes,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  // Set the state variable value to the value supplied from the input
  updateStateValue = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  editMedicineLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.medicineTitle) || isInputEmpty(this.state.medicineReason) || isInputEmpty(this.state.medicineTime)) {
      missingDataAlert();
      return;
    } else if (!isValidTime(this.state.medicineTime)) {
      invalidTimeAlert();
    // If inputs are valid, update variable values to the database
  } else {
      const documentUpdate = app.firestore().collection("medicineAdministration").doc(this.state.key);
      documentUpdate
        .set({
          child_name: this.state.childName,
          medicine_date: convertToTimestamp(this.state.medicineDate),
          medicine_title: this.state.medicineTitle,
          medicine_time: this.state.medicineTime,
          medicine_reason: this.state.medicineReason,
          medicine_notes: this.state.medicineNotes,
        })
        // Navigate the user back to the ViewMedicalInfo page
        .then(() => {
          this.props.navigation.navigate("ViewMedicalInfo");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the medicine log from the database, using userkey as an identifier & navigate the user back to the ViewMedicalInfo page 
  deleteMedicineLog() {
    const documentReference = app
      .firestore()
      .collection("medicineAdministration")
      .doc(this.props.route.params.userkey);

    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewMedicalInfo");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteMedicineLog() },
        { text: "No", onPress: () => console.log("Item not deleted"), style: "cancel" },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    return (
      <ScrollView>
        <Text style={styles.bold}>Child Name</Text>
        <View>
          {/* ModalSelector populated with children names from childNameArr */}
          <ModalSelector
            style={styles.dropdown}
            data={this.state.childNames}
            onChange={(option) => {
              this.setState({ childName: option.label });
            }}
          >
          <Text style={styles.dropdownText}>Select Child: {this.state.childName}</Text>
          </ModalSelector>
        </View>
        <Text style={styles.bold}>Medicine</Text>
        <TextInput
          style={styles.input}
          placeholder={"Medicine"}
          value={this.state.medicineTitle}
          onChangeText={(value) => this.updateStateValue(value, "medicineTitle")}
        />
        <Text style={styles.bold}>Date Administered</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
            {this.state.show && (
              <DateTimePicker
                maximumDate={new Date()}
                value={this.state.date}
                mode="date"
                onChange={this.onDateChange}
              />
            )}
            <Text style={styles.buttonText}>
              Choose a Date: {this.state.medicineDate.toString()}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Time Administered</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.medicineTime}
          onChangeText={(value) => this.updateStateValue(value, "medicineTime")}
        />
        <Text style={styles.bold}>What was the reason for administering medication?</Text>
        <TextInput
          style={styles.input}
          placeholder={"Reason for medicine administration"}
          value={this.state.medicineReason}
          onChangeText={(value) => this.updateStateValue(value, "medicineReason")}
        />
        <Text style={styles.bold}>Additional Notes</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert any additional information"}
          value={this.state.medicineNotes}
          onChangeText={(value) => this.updateStateValue(value, "medicineNotes")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => {this.editMedicineLog()}}>
          <Text style={styles.buttonTextMenu}>Update</Text>
        </Button>
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#EE752E"
          onPress={this.alertDialog}>
          <Text style={styles.buttonTextMenu}>Delete</Text>
        </Button>
        <View style={styles.submitButtonSpace}></View>
      </ScrollView>
    );
  }
}
