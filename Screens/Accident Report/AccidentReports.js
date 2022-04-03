import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

// navigation parameter enables the user to navigate to a new page depending on the button that they press on
export default function AccidentReports({ navigation }) {
  return (
    <View style={styles.fitToText}>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogAccidentReport")}>
        <Text style={styles.buttonTextMenu}>Log Accident Report</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewAccidentReports")}>
        <Text style={styles.buttonTextMenu}>View Accident Reports</Text>
      </Button>
    </View>
  );
}
