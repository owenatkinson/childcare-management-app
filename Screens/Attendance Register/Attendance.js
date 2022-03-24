import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

export default function Attendance({ navigation }) {
  return (
    <View style={(styles.fitToText, styles.space)}>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("Attendance Register")}>
        <Text style={styles.buttonTextMenu}>Log Attendance</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewLogs")}>
        <Text style={styles.buttonTextMenu}>View Attendance Logs</Text>
      </Button>
    </View>
  );
}
