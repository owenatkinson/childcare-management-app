import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

export default function ManageChildren({ navigation }) {
  return (
    <View style={(styles.fitToText, styles.space)}>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("AddNewChild")}>
        <Text style={styles.buttonTextMenu}>Add New Child</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewChildren")}>
        <Text style={styles.buttonTextMenu}>View Active Children</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewInactiveChildren")}>
        <Text style={styles.buttonTextMenu}>View Inactive Children</Text>
      </Button>
    </View>
  );
}
