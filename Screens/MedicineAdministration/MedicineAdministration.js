import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

// navigation parameter to navigate the user to a new page
export default function MedicineAdministration({ navigation }) {
  return (
    <View style={(styles.fitToText, styles.space)}>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogMedicine")}>
        <Text style={styles.buttonTextMenu}>Log Medical Information</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewMedicalInfo")}>
        <Text style={styles.buttonTextMenu}>View Medical Information</Text>
      </Button>
    </View>
  );
}
