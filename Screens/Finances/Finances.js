import React from 'react';
import { View, Button, Text } from 'react-native';
const styles = require('../../Styles/general');

export default function Finances({ navigation }) {
  return (
    <View style={styles.fitToText}>
        <Text style={styles.boldCentreText}>Expenses</Text>
        <View style={styles.space}></View>
        <Button
          title="Log Expense"
          onPress={() => navigation.navigate('LogExpense')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Expenses"
          onPress={() => navigation.navigate('ViewExpenses')}
        />
        <View style={styles.space}></View>
        <Text style={styles.boldCentreText}>Mileage</Text>
        <View style={styles.space}></View>
        <Button
          title="Log Mileage"
          onPress={() => navigation.navigate('LogMiles')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Mileage Logs"
          onPress={() => navigation.navigate('ViewMiles')}
        />
        <View style={styles.space}></View>
        <Text style={styles.boldCentreText}>Invoices</Text>
        <View style={styles.space}></View>
        <Button
          title="Log Invoice"
          onPress={() => navigation.navigate('LogInvoice')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Invoices"
          onPress={() => navigation.navigate('ViewInvoice')}
        />
    </View>
  );
}