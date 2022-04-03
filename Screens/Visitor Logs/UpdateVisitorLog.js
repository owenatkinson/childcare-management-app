import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, parseDate, missingDataAlert, invalidTimeAlert, isValidTime, isInputEmpty, convertToTimestamp } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class UpdateVisitorLog extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      visitorName: "",
      dateOfVisit: "",
      timeIn: "",
      timeOut: "",
      visitPurpose: "",
      date: new Date(),
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfVisit: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads vistor log data from the database into the page
  componentDidMount() {
    const documentReference = app.firestore().collection("visitorLogs").doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          visitorName: data.visitor_name,
          dateOfVisit: parseDate(data.date_of_visit),
          timeIn: data.time_in,
          timeOut: data.time_out,
          visitPurpose: data.visit_purpose,
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

  editVisitorLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.visitorName) || isInputEmpty(this.state.visitPurpose) || isInputEmpty(this.state.timeIn) || isInputEmpty(this.state.timeOut)) {
      missingDataAlert();
      return;
    } else if (!isValidTime(this.state.timeIn) || !isValidTime(this.state.timeOut)) {
      invalidTimeAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app
      .firestore()
      .collection("visitorLogs")
      .doc(this.state.key);

      documentUpdate
        .set({
          visitor_name: this.state.visitorName,
          date_of_visit: convertToTimestamp(this.state.dateOfVisit),
          time_in: this.state.timeIn,
          time_out: this.state.timeOut,
          visit_purpose: this.state.visitPurpose,
        })
        // Navigate the user back to the ViewVisitorLogs page
        .then(() => {
          this.props.navigation.navigate("ViewVisitorLogs");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the vistor log from the database, using userkey as an identifier & navigate the user back to the ViewVisitorLogs page 
  deleteVisitorLog() {
    const documentReference = app
      .firestore()
      .collection("visitorLogs")
      .doc(this.props.route.params.userkey);

    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewVisitorLogs");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteVisitorLog() },
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
        <Text style={styles.bold}>Visitor Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Visitor Name"}
          value={this.state.visitorName}
          onChangeText={(value) => this.updateStateValue(value, "visitorName")}
        />
        <Text style={styles.bold}>Date of Visit</Text>
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
            <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfVisit}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Time In</Text>
        <TextInput
          style={styles.input}
          value={this.state.timeIn}
          onChangeText={(value) => this.updateStateValue(value, "timeIn")}
        />
        <Text style={styles.bold}>Time Out</Text>
        <TextInput
          style={styles.input}
          value={this.state.timeOut}
          onChangeText={(value) => this.updateStateValue(value, "timeOut")}
        />
        <Text style={styles.bold}>Purpose of Visit</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Purpose of Visit"}
          value={this.state.visitPurpose}
          onChangeText={(value) => this.updateStateValue(value, "visitPurpose")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => {this.editVisitorLog()}}>
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
      </ScrollView>
    );
  }
}
