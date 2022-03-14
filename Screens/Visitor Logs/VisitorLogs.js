import React from "react";
import { View, Button } from "react-native";
const styles = require("../../Styles/general");

export default function VisitorLogs({ navigation }) {
  return (
    <View style={(styles.fitToText, styles.space)}>
      <View style={styles.space}></View>
      <Button title="Log Visitor" onPress={() => navigation.navigate("LogVisitor")} />
      <View style={styles.space}></View>
      <Button title="View Visitor Logs" onPress={() => navigation.navigate("ViewVisitorLogs")} />
    </View>
  );
}
