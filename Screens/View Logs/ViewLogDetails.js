import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, missingDataAlert, invalidTimeAlert, isInputEmpty, isValidTime } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewLogDetails extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      childName: "",
      dateOfAttendance: "",
      checkInTime: "",
      checkOutTime: "",
      droppedBy: "",
      collectedBy: "",
      temperatureChecked: "",
      additionalNotes: "",
      childNames: [],
      date: new Date(),
      show: false
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfAttendance: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads attendance log data from the database into the page
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

    // Query the database to gather attendance log data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("attendanceRegister")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const log = result.data();
        this.setState({
          key: result.id,
          childName: log.child_name,
          dateOfAttendance: log.date_of_attendance,
          checkInTime: log.check_in_time,
          checkOutTime: log.check_out_time,
          droppedBy: log.dropped_by,
          collectedBy: log.collected_by,
          temperatureChecked: log.temperature_checked,
          additionalNotes: log.additional_notes,
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

  editAttendanceLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.checkInTime) || isInputEmpty(this.state.checkOutTime) || isInputEmpty(this.state.droppedBy) || isInputEmpty(this.state.collectedBy)) {
      missingDataAlert();
      return;
    } else if (!isValidTime(this.state.checkOutTime) || !isValidTime(this.state.checkInTime)) {
      invalidTimeAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app.firestore().collection("attendanceRegister").doc(this.state.key);
      documentUpdate
        .set({
          child_name: this.state.childName,
          date_of_attendance: this.state.dateOfAttendance,
          check_in_time: this.state.checkInTime,
          check_out_time: this.state.checkOutTime,
          dropped_by: this.state.droppedBy,
          collected_by: this.state.collectedBy,
          temperature_checked: this.state.temperatureChecked,
          additional_notes: this.state.additionalNotes,
        })
        .then(() => {
          this.props.navigation.navigate("ViewLogs");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the attendance log from the database, using userkey as an identifier & navigate the user back to the ViewLogs page 
  deleteAttendanceLog() {
    const documentReference = app
      .firestore()
      .collection("attendanceRegister")
      .doc(this.props.route.params.userkey);

    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewLogs");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteAttendanceLog() },
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
        <View style={styles.space}></View>
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
        <Text style={styles.bold}>Date of Attendance</Text>
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
            <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfAttendance}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Check-in Time</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.checkInTime}
          onChangeText={(value) => this.updateStateValue(value, "checkInTime")}
        />
        <Text style={styles.bold}>Check-out Time</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.checkOutTime}
          onChangeText={(value) => this.updateStateValue(value, "checkOutTime")}
        />
        <Text style={styles.bold}>Dropped By</Text>
        <TextInput
          style={styles.input}
          placeholder={"Dropped By"}
          value={this.state.droppedBy}
          onChangeText={(value) => this.updateStateValue(value, "droppedBy")}
        />
        <Text style={styles.bold}>Collected By</Text>
        <TextInput
          style={styles.input}
          placeholder={"Collected By"}
          value={this.state.collectedBy}
          onChangeText={(value) => this.updateStateValue(value, "collectedBy")}
        />
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Temperature Checked:</Text>
          <CheckBox
            style={styles.checkBox}
            disabled={false}
            value={this.state.temperatureChecked}
            onValueChange={(value) => this.updateStateValue(value, "temperatureChecked")}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <Text style={styles.boldTextCheckbox}>Additional Notes</Text>
        <TextInput
          style={styles.extendedInput}
          multiline={true}
          numberOfLines={4}
          placeholder={"Insert any additional information"}
          value={this.state.additionalNotes}
          onChangeText={(value) => this.updateStateValue(value, "additionalNotes")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => this.editAttendanceLog()}>
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
