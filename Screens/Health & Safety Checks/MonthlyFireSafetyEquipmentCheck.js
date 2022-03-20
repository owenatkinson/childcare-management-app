import React, { Component } from "react";
import { Button, View, ScrollView, TextInput, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../Components/firebase";
import "firebase/firestore";
const styles = require("../../Styles/general");

export default class MonthlyFireSafetyEquipmentCheck extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireSafetyDate: "",
      monthlyFireSafetyNote: "",
      monthlyFireSafetyIsCompleted: "",
    };
  }

  componentDidMount() {
    const documentReference = app
      .firestore()
      .collection("monthlyFireSafetyEquipmentCheck")
      .doc(this.props.route.params.userkey);
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          monthlyFireSafetyDate: data.monthly_fire_safety_date,
          monthlyFireSafetyNote: data.monthly_fire_safety_note,
          monthlyFireSafetyIsCompleted: data.monthly_fire_safety_is_completed,
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
    this.setState({
      isLoading: true,
    });
    const documentUpdate = app
      .firestore()
      .collection("monthlyFireSafetyEquipmentCheck")
      .doc(this.state.key);
    documentUpdate
      .set({
        monthly_fire_safety_date: this.state.monthlyFireSafetyDate,
        monthly_fire_safety_note: this.state.monthlyFireSafetyNote,
        monthly_fire_safety_is_completed: this.state.monthlyFireSafetyIsCompleted,
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
            onChangeText={(value) => this.inputEl(value, "monthlyFireSafetyNote")}
          />
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Check Completed:</Text>
            <CheckBox
              style={styles.checkBox}
              value={this.state.monthlyFireSafetyIsCompleted}
              onValueChange={(value) => this.inputEl(value, "monthlyFireSafetyIsCompleted")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.space}></View>
          <Button title="Update" onPress={() => this.editCheck()} color="#0B8FDC" />
        </ScrollView>
      </View>
    );
  }
}
