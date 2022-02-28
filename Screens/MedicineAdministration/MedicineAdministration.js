import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

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

const styles = StyleSheet.create({
  fixToText: {
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  space: {
    height: 20,
  }
});