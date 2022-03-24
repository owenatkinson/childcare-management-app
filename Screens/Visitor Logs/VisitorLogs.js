import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

export default function VisitorLogs({ navigation }) {
  return (
    <View style={(styles.fitToText, styles.space)}>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogVisitor")}>
        <Text style={styles.buttonTextMenu}>Log Visitor</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewVisitorLogs")}>
        <Text style={styles.buttonTextMenu}>View Visitor Logs</Text>
      </Button>
    </View>
  );
}
