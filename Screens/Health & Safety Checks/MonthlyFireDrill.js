import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { missingDataAlert, isNumeric, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class MonthlyFireDrill extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      monthlyFireDrillDate: "",
      monthlyFireDrillNumberOfPeople: "",
      monthlyFireDrillTimeCompleted: new Date(),
      monthlyFireDrillNote: "",
      date: new Date(),
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      monthlyFireDrillTimeCompleted: currentDate,
      show: false,
    });
  };

  // If input isn't a string, it uses moment to convert a date into a time in "HH:mm" format and then returns it as a string
  convertToTime(dateInput) {
    if (typeof dateInput !== "string") {
      dateInput = moment(dateInput).format("HH:mm").toString();
    }
    return dateInput;
  }

  // Converts a timestamp into time format
  trimTimestamp(dateInput) {
    var timeConvert = dateInput.toDate().toLocaleTimeString();
    timeConvert = timeConvert.split(":");
    return timeConvert[0] + ":" + timeConvert[1];
  }

  // Display time picker
  showTimepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    // Query the database to gather monthly fire drill data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("monthlyFireDrill")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          monthlyFireDrillDate: data.monthly_fire_drill_date,
          monthlyFireDrillNumberOfPeople: data.monthly_fire_drill_num_of_people,
          monthlyFireDrillTimeCompleted: this.trimTimestamp(data.monthly_fire_drill_time_completed),
          monthlyFireDrillNote: data.monthly_fire_drill_note,
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

  editCheck() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.monthlyFireDrillNumberOfPeople)) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.monthlyFireDrillNumberOfPeople)){
      numericDataAlert();
    // If inputs are valid, update variable values to the database
  } else {
    const documentUpdate = app.firestore().collection("monthlyFireDrill").doc(this.state.key);
    documentUpdate
      .set({
        monthly_fire_drill_date: this.state.monthlyFireDrillDate,
        monthly_fire_drill_num_of_people: this.state.monthlyFireDrillNumberOfPeople,
        monthly_fire_drill_time_completed: this.state.monthlyFireDrillTimeCompleted,
        monthly_fire_drill_note: this.state.monthlyFireDrillNote
      })
      // Navigate the user back to the HealthSafetyChecks page
      .then(() => {
        this.props.navigation.navigate("HealthSafetyChecks");
      })
      // If an error occurs during this process, print an error
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.monthlyFireDrillDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.space}></View>
          <Text style={styles.bold}>Number of People:</Text>
          <TextInput
            placeholder={"Number of People present"}
            style={styles.input}
            value={this.state.monthlyFireDrillNumberOfPeople}
            onChangeText={(value) => this.updateStateValue(value, "monthlyFireDrillNumberOfPeople")}
          />
          <Text style={styles.bold}>Time Completed:</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.showTimepicker()}>
              {this.state.show && (
                <DateTimePicker
                  value={this.state.date}
                  mode="time"
                  onChange={this.onDateChange}
                />
              )}
              <Text style={styles.buttonText}>
                Choose a Date: {this.convertToTime(this.state.monthlyFireDrillTimeCompleted)}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bold}>Additional Notes:</Text>
          <TextInput
            placeholder={"Insert any additional information"}
            style={styles.extendedInput}
            multiline={true}
            numberOfLines={4}
            value={this.state.monthlyFireDrillNote}
            onChangeText={(value) => this.updateStateValue(value, "monthlyFireDrillNote")}
          />
          <View style={styles.space}></View>
          <Button 
            mode="contained"
            uppercase={false}
            color="#0B8FDC"
            onPress={() => this.editCheck()}>
            <Text style={styles.buttonTextMenu}>Update</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}
