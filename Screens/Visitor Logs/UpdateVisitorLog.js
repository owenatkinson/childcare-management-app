import React, { Component } from "react";
import { Button, View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
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
    const docRef = app.firestore().collection("visitorLogs").doc(this.props.route.params.userkey);
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          visitorName: user.visitor_name,
          dateOfVisit: parseDate(user.date_of_visit),
          timeIn: user.time_in,
          timeOut: user.time_out,
          visitPurpose: user.visit_purpose,
          isLoading: false,
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
  };

  editVisitorLog() {
    if (this.state.visitorName.length == 0 || this.state.visitPurpose.length == 0) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      const docUpdate = app.firestore().collection("visitorLogs").doc(this.state.key);
      docUpdate
        .set({
          visitor_name: this.state.visitorName,
          date_of_visit: this.convertToTimestamp(this.state.dateOfVisit),
          time_in: this.state.timeIn,
          time_out: this.state.timeOut,
          visit_purpose: this.state.visitPurpose,
        })
        .then(() => {
          this.setState({
            key: "",
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
    const docRef = app.firestore().collection("visitorLogs").doc(this.props.route.params.userkey);
    docRef.delete().then((res) => {
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
          onChangeText={(val) => this.inputEl(val, "visitorName")}
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
          onChangeText={(val) => this.inputEl(val, "timeIn")}
        />
        <Text style={styles.bold}>Time Out</Text>
        <TextInput
          style={styles.input}
          value={this.state.timeOut}
          onChangeText={(val) => this.inputEl(val, "timeOut")}
        />
        <Text style={styles.bold}>Purpose of Visit</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Purpose of Visit"}
          value={this.state.visitPurpose}
          onChangeText={(val) => this.inputEl(val, "visitPurpose")}
        />
        <View style={styles.space}></View>
        <Button title="Update" onPress={() => this.editVisitorLog()} color="#0B8FDC" />
        <View style={styles.space}></View>
        <Button title="Delete" onPress={this.alertDialog} color="#EE752E" />
      </ScrollView>
    );
  }
}
