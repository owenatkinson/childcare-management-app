import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateMiles extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      dateOfMileage: "",
      mileageAmount: "",
      mileageRate: "",
      milesTravelled: "",
      date: new Date(),
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfMileage: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads mileage data from the database into the page
  componentDidMount() {
    const documentReference = app
      .firestore()
      .collection("mileageLogs")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dateOfMileage: parseDate(data.date_of_mileage),
          mileageAmount: data.mileage_amount,
          mileageRate: data.mileage_rate,
          milesTravelled: data.miles_travelled,
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

  editMileageLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.mileageRate) || isInputEmpty(this.state.milesTravelled)) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.mileageRate) || !isNumeric(this.state.milesTravelled)){
      numericDataAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app
        .firestore()
        .collection("mileageLogs")
        .doc(this.state.key);
      documentUpdate
        .set({
          date_of_mileage: convertToTimestamp(this.state.dateOfMileage),
          mileage_amount: this.state.mileageAmount,
          mileage_rate: this.state.mileageRate,
          miles_travelled: this.state.milesTravelled,
        })
        // Navigate the user back to the ViewMiles page
        .then(() => {
          this.props.navigation.navigate("ViewMiles");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the mileage log from the database, using userkey as an identifier & navigate the user back to the ViewMiles page 
  deleteMileageLog() {
    const documentReference = app
      .firestore()
      .collection("mileageLogs")
      .doc(this.props.route.params.userkey);
      
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewMiles");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteMileageLog() },
        {
          text: "No",
          onPress: () => console.log("Item not deleted"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // Display alert to confirm if the user wants to log mileage data to the database
  confirmDialog = () => {
    Alert.alert(
      "Log Mileage",
      "Confirm",
      [
        { text: "Log", onPress: () => this.editMileageLog() }
      ],
      {
        cancelable: true,
      }
    );
  };

  // calculates the mileage amount based on the milesTravelled and mileageRate variables
  calculateMileage(){
    this.setState({
      mileageAmount: parseFloat(this.state.milesTravelled * parseFloat(this.state.mileageRate)).toFixed(2),
    });
  }

  // calculates the mileage amount and displays alert dialog
  calculateAndAlert(){
    this.setState({
      mileageAmount: parseFloat(this.state.milesTravelled * parseFloat(this.state.mileageRate)).toFixed(2),
    });
    this.confirmDialog();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Miles Travelled</Text>
        <TextInput
          style={styles.input}
          placeholder={"Miles Travelled"}
          value={this.state.milesTravelled}
          onChangeText={(value) => this.updateStateValue(value, "milesTravelled")}
        />
        <Text style={styles.bold}>Rate (pence per mile)</Text>
        <TextInput
          style={styles.input}
          placeholder={"0.00"}
          value={this.state.mileageRate}
          onChangeText={(value) => this.updateStateValue(value, "mileageRate")}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.calculateMileage();
            }}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>
          Mileage Amount: £{this.state.mileageAmount}
        </Text>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Date of Mileage Expense:</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showDatepicker()}
          >
            {this.state.show && (
              <DateTimePicker
                maximumDate={new Date()}
                value={this.state.date}
                mode="date"
                onChange={this.onDateChange}
              />
            )}
            <Text style={styles.buttonText}>
              Choose a Date: {this.state.dateOfMileage}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => {this.calculateAndAlert()}}>
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
