import React, { Component } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
const styles = require("../../Styles/general");

export default class MonthlyFireSafetyEquipmentCheck extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      monthlyFireSafetyDate: "",
      monthlyFireSafetyNote: ""
    };
  }

  componentDidMount() {
    // Query the database to gather monthly fire safety equipment check data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("monthlyFireSafetyEquipmentCheck")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          monthlyFireSafetyDate: data.monthly_fire_safety_date,
          monthlyFireSafetyNote: data.monthly_fire_safety_note,
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
    // Update variable values to the database
    const documentUpdate = app
      .firestore()
      .collection("monthlyFireSafetyEquipmentCheck")
      .doc(this.state.key);
    documentUpdate
      .set({
        monthly_fire_safety_date: this.state.monthlyFireSafetyDate,
        monthly_fire_safety_note: this.state.monthlyFireSafetyNote
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

  render() {
    return (
      <View>
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.monthlyFireSafetyDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.space}></View>
          <Text style={styles.bold}>Notes:</Text>
          <TextInput
            style={styles.extendedInput}
            multiline={true}
            numberOfLines={4}
            value={this.state.monthlyFireSafetyNote}
            onChangeText={(value) => this.updateStateValue(value, "monthlyFireSafetyNote")}
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
