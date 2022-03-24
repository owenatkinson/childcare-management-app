import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, parseDate, missingDataAlert } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class UpdateVisitorLog extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      visitorName: "",
      dateOfVisit: "",
      timeIn: "",
      timeOut: "",
      visitPurpose: "",
      date: new Date(),
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfVisit: convertDate(currentDate),
      show: false,
    });
  };

  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  convertToTimestamp(dateInput) {
    dateInput = dateInput.split("/");
    var newDate = new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
    return newDate;
  }

  componentDidMount() {
    const documentReference = app.firestore().collection("visitorLogs").doc(this.props.route.params.userkey);
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

  editVisitorLog() {
    if (this.state.visitorName.length == 0 || this.state.visitPurpose.length == 0) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      const documentUpdate = app.firestore().collection("visitorLogs").doc(this.state.key);
      documentUpdate
        .set({
          visitor_name: this.state.visitorName,
          date_of_visit: this.convertToTimestamp(this.state.dateOfVisit),
          time_in: this.state.timeIn,
          time_out: this.state.timeOut,
          visit_purpose: this.state.visitPurpose,
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ViewVisitorLogs");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  deleteVisitorLog() {
    const documentReference = app.firestore().collection("visitorLogs").doc(this.props.route.params.userkey);
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewVisitorLogs");
    });
  }

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
          onChangeText={(value) => this.inputEl(value, "visitorName")}
        />
        <Text style={styles.bold}>Date of Visit</Text>
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
            <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfVisit}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Time In</Text>
        <TextInput
          style={styles.input}
          value={this.state.timeIn}
          onChangeText={(value) => this.inputEl(value, "timeIn")}
        />
        <Text style={styles.bold}>Time Out</Text>
        <TextInput
          style={styles.input}
          value={this.state.timeOut}
          onChangeText={(value) => this.inputEl(value, "timeOut")}
        />
        <Text style={styles.bold}>Purpose of Visit</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Purpose of Visit"}
          value={this.state.visitPurpose}
          onChangeText={(value) => this.inputEl(value, "visitPurpose")}
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
