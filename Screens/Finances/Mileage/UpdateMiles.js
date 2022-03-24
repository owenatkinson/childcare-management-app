import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric, calculationAlert, numericDataAlert } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateMiles extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dateOfMileage: "",
      mileageAmount: "",
      mileageRate: "",
      milesTravelled: "",
      date: new Date(),
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfMileage: convertDate(currentDate),
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
      .collection("mileageLogs")
      .doc(this.props.route.params.userkey);
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dateOfMileage: parseDate(data.date_of_mileage),
          mileageAmount: data.mileage_amount,
          mileageRate: data.mileage_rate,
          milesTravelled: data.miles_travelled,
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

  editMileageLog() {
    if (this.state.mileageRate.length == 0 || this.state.milesTravelled.length == 0) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.mileageRate) || !isNumeric(this.state.milesTravelled)){
      numericDataAlert();
    } else {
      this.setState({
        isLoading: true,
      });
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
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ViewMiles");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  deleteMileageLog() {
    const documentReference = app
      .firestore()
      .collection("mileageLogs")
      .doc(this.props.route.params.userkey);
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewMiles");
    });
  }

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

  calculateMileage(){
    this.setState({
      mileageAmount: parseFloat(this.state.milesTravelled * parseFloat(this.state.mileageRate)).toFixed(2),
    });
  }

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
          onChangeText={(value) => this.inputEl(value, "milesTravelled")}
        />
        <Text style={styles.bold}>Rate (pence per mile)</Text>
        <TextInput
          style={styles.input}
          placeholder={"0.00"}
          value={this.state.mileageRate}
          onChangeText={(value) => this.inputEl(value, "mileageRate")}
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
                onChange={this.onChange}
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
