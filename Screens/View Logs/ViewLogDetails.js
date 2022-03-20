import React, { Component } from "react";
import { Button, View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, missingDataAlert } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewLogDetails extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfAttendance: convertDate(currentDate),
      show: false,
    });
  };

  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    const documentReference = app
      .firestore()
      .collection("attendanceRegister")
      .doc(this.props.route.params.userkey);
    const childNames = [];
    let index = 0;

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

  editLog() {
    if (this.state.checkInTime.length == 0 || this.state.checkOutTime.length == 0 || this.state.droppedBy.length == 0 || this.state.collectedBy.length == 0) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
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
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ViewLogs");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  deleteLog() {
    const documentReference = app
      .firestore()
      .collection("attendanceRegister")
      .doc(this.props.route.params.userkey);
    documentReference.delete().then(() => {
      console.log("Doc deleted.");
      this.props.navigation.navigate("ViewLogs");
    });
  }

  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteLog() },
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
                onChange={this.onChange}
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
          onChangeText={(value) => this.inputEl(value, "checkInTime")}
        />
        <Text style={styles.bold}>Check-out Time</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.checkOutTime}
          onChangeText={(value) => this.inputEl(value, "checkOutTime")}
        />
        <Text style={styles.bold}>Dropped By</Text>
        <TextInput
          style={styles.input}
          placeholder={"Dropped By"}
          value={this.state.droppedBy}
          onChangeText={(value) => this.inputEl(value, "droppedBy")}
        />
        <Text style={styles.bold}>Collected By</Text>
        <TextInput
          style={styles.input}
          placeholder={"Collected By"}
          value={this.state.collectedBy}
          onChangeText={(value) => this.inputEl(value, "collectedBy")}
        />
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Temperature Checked:</Text>
          <CheckBox
            style={styles.checkBox}
            disabled={false}
            value={this.state.temperatureChecked}
            onValueChange={(value) => this.inputEl(value, "temperatureChecked")}
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
          onChangeText={(value) => this.inputEl(value, "additionalNotes")}
        />
        <View style={styles.space}></View>
        <Button title="Update" onPress={() => this.editLog()} color="#0B8FDC" />
        <View style={styles.space}></View>
        <Button title="Delete" onPress={this.alertDialog} color="#EE752E" />
      </ScrollView>
    );
  }
}
