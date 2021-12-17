import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default function VisitorLogs({ navigation }) {
  return (
    <View style={styles.fixToText, styles.space}>
      <View style={styles.space}></View>
      <Button 
        title="Log Visitor"
        onPress={() => navigation.navigate('LogVisitor')}
      />
      <View style={styles.space}></View>
      <Button
        title="View Visitor Logs"
        onPress={() => navigation.navigate('ViewVisitorLogs')}
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