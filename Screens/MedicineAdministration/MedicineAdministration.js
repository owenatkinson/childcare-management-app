import React from 'react';
import { View, Button } from 'react-native';
const styles = require('../../Styles/general');

export default function MedicineAdministration({ navigation }) {
  return (
    <View style={styles.fixToText, styles.space}>
      <View style={styles.space}></View>
      <Button 
        title="Log Medical Information"
        onPress={() => navigation.navigate('LogMedicine')}
      />
      <View style={styles.space}></View>
      <Button
        title="View Medical Information"
        onPress={() => navigation.navigate('ViewMedicalInfo')}
      />
    </View>
  );
}