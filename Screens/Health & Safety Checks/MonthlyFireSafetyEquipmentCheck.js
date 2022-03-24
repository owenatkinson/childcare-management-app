import React, { Component } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
const styles = require("../../Styles/general");

export default class MonthlyFireSafetyEquipmentCheck extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireSafetyDate: "",
      monthlyFireSafetyNote: ""
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
        monthly_fire_safety_note: this.state.monthlyFireSafetyNote
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
