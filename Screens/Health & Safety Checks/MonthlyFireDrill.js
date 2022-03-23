import React, { Component } from "react";
import { Button, View, TouchableOpacity, ScrollView, TextInput, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../Components/firebase";
import "firebase/firestore";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { missingDataAlert, isNumeric } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class MonthlyFireDrill extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireDrillDate: "",
      monthlyFireDrillNumberOfPeople: "",
      monthlyFireDrillTimeCompleted: new Date(),
      monthlyFireDrillNote: "",
      monthlyFireDrillIsCompleted: "",
      date: new Date(),
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      monthlyFireDrillTimeCompleted: currentDate,
      show: false,
    });
  };

  convertToTime(dateInput) {
    if (typeof dateInput !== "string") {
      dateInput = moment(dateInput).format("HH:mm").toString();
    }
    return dateInput;
  }

  convertToTimestamp(dateInput) {
    var timeConvert = dateInput.toDate().toLocaleTimeString();
    timeConvert = timeConvert.split(":");
    return timeConvert[0] + ":" + timeConvert[1];
  }

  showTimepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    const documentReference = app
      .firestore()
      .collection("monthlyFireDrill")
      .doc(this.props.route.params.userkey);
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          monthlyFireDrillDate: data.monthly_fire_drill_date,
          monthlyFireDrillNumberOfPeople: data.monthly_fire_drill_num_of_people,
          monthlyFireDrillTimeCompleted: this.convertToTimestamp(data.monthly_fire_drill_time_completed),
          monthlyFireDrillNote: data.monthly_fire_drill_note,
          monthlyFireDrillIsCompleted: data.monthly_fire_drill_is_completed,
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

  editCheck() {
    if (this.state.monthlyFireDrillNumberOfPeople.length == 0) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.monthlyFireDrillNumberOfPeople)){
      numericDataAlert();
    } else {
      this.setState({
        isLoading: true,
      });
      const documentUpdate = app.firestore().collection("monthlyFireDrill").doc(this.state.key);
      documentUpdate
        .set({
          monthly_fire_drill_date: this.state.monthlyFireDrillDate,
          monthly_fire_drill_num_of_people: this.state.monthlyFireDrillNumberOfPeople,
          monthly_fire_drill_time_completed: this.state.monthlyFireDrillTimeCompleted,
          monthly_fire_drill_note: this.state.monthlyFireDrillNote,
          monthly_fire_drill_is_completed: this.state.monthlyFireDrillIsCompleted,
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("HealthSafetyChecks");
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
            onChangeText={(value) => this.inputEl(value, "monthlyFireDrillNumberOfPeople")}
          />
          <Text style={styles.bold}>Time Completed:</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.showTimepicker()}>
              {this.state.show && (
                <DateTimePicker
                  value={this.state.date}
                  mode="time"
                  onChange={this.onChange}
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
            onChangeText={(value) => this.inputEl(value, "monthlyFireDrillNote")}
          />
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Check Completed:</Text>
            <CheckBox
              style={styles.checkBox}
              value={this.state.monthlyFireDrillIsCompleted}
              onValueChange={(value) => this.inputEl(value, "monthlyFireDrillIsCompleted")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.space}></View>
          <Button title="Update" onPress={() => this.editCheck()} color="#0B8FDC" />
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </ScrollView>
      </View>
    );
  }
}
