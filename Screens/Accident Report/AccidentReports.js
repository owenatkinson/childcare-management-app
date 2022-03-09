import React from 'react';
import { View, Button } from 'react-native';
const styles = require('../../Styles/general');

export default function AccidentReports({ navigation }) {
  return (
    <View style={styles.fixToText}>
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