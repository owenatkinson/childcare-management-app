import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const styles = require("../../Styles/general");

export default function Finances({ navigation }) {
  return (
    <View style={styles.fitToText}>
      <Text style={styles.boldCentreText}>Expenses</Text>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogExpense")}>
        <Text style={styles.buttonTextMenu}>Log Expense</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewExpenses")}>
        <Text style={styles.buttonTextMenu}>View Expenses</Text>
      </Button>
      <View style={styles.space}></View>
      <Text style={styles.boldCentreText}>Mileage</Text>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogMiles")}>
        <Text style={styles.buttonTextMenu}>Log Mileage</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewMiles")}>
        <Text style={styles.buttonTextMenu}>View Mileage Logs</Text>
      </Button>
      <View style={styles.space}></View>
      <Text style={styles.boldCentreText}>Invoices</Text>
      <View style={styles.space}></View>
      <Button 
        icon="plus"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("LogInvoice")}>
        <Text style={styles.buttonTextMenu}>Log Invoice</Text>
      </Button>
      <View style={styles.space}></View>
      <Button 
        icon="card-search"
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => navigation.navigate("ViewInvoice")}>
        <Text style={styles.buttonTextMenu}>View Invoices</Text>
      </Button>
    </View>
  );
}
