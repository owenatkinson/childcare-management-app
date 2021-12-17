import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// import AddNewChildButton from '../../AddButton';

export default function ManageChildren({ navigation }) {
  return (
    <View style={styles.fixToText, styles.space}>
        <View style={styles.space}></View>
        <Button
          title="Add New Child"
          onPress={() => navigation.navigate('AddNewChild')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Children"
          onPress={() => navigation.navigate('ViewChildren')}
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