import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function Finances({ navigation }) {
  return (
    <View style={styles.fixToText, styles.space}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, space: {
    height: 20,
  }
})