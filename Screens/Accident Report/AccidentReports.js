import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default function AccidentReports({ navigation }) {
  return (
    <View style={styles.fixToText, styles.space}>
      <View style={styles.space}></View>
      <Button 
        title="Log Accident Report"
        onPress={() => navigation.navigate('LogAccidentReport')}
      />
      <View style={styles.space}></View>
      <Button
        title="View Accident Reports"
        onPress={() => navigation.navigate('ViewAccidentReports')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixToText: {
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  space: {
    height: 20,
  }
});