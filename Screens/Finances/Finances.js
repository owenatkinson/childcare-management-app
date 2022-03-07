import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function Finances({ navigation }) {
  return (
    <View style={styles.fixToText}>
        <Text style={styles.bold}>Expenses</Text>
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
        <Text style={styles.bold}>Mileage</Text>
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
        <Text style={styles.bold}>Invoices</Text>
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

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, space: {
    height: 20,
  }, bold: {
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})