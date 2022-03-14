import React from 'react';
import { View, Button } from 'react-native';
const styles = require('../../Styles/general');

export default function ManageChildren({ navigation }) {
  return (
    <View style={styles.fitToText, styles.space}>
        <View style={styles.space}></View>
        <Button
          title="Add New Child"
          onPress={() => navigation.navigate('AddNewChild')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Active Children"
          onPress={() => navigation.navigate('ViewChildren')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Inactive Children"
          onPress={() => navigation.navigate('ViewInactiveChildren')}
        />
    </View>
  );
}