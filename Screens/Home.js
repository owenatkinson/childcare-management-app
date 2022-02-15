import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Date from '../Date';

export default function HomeScreen({ navigation }) {
  return (
      <View>
        <Date></Date>
        <View style={styles.fixToText}>
          <Button 
            title="Attendance Register"
            onPress={() => navigation.navigate('Attendance')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Health & Safety Checks"
            onPress={() => navigation.navigate('HealthSafetyChecks')}
          />
          <View style={styles.space}></View>
          <Button
            title="Medicine Administration"
            onPress={() => navigation.navigate('MedicineAdministration')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Manage Children"
            onPress={() => navigation.navigate('ManageChildren')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Policies"
            onPress={() => navigation.navigate('Policies')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Finances"
            onPress={() => navigation.navigate('Finances')}
          />
          <View style={styles.space}></View>
          <Button
            title="Allergy Detection"
            onPress={() => navigation.navigate('Allergy')}
          />
          <View style={styles.space}></View>
          <Button
            title="Accident Reports"
            onPress={() => navigation.navigate('AccidentReports')}
          />
          <View style={styles.space}></View>
          <Button
            title="View Logs"
            onPress={() => navigation.navigate('ViewLogs')}
          />
          <View style={styles.space}></View>
          <Button
            title="Visitor Logs"
            onPress={() => navigation.navigate('VisitorLogs')}
          />
        </View>
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