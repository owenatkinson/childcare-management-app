import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../../firebase';
import "firebase/firestore";

export default function AddMonthlyDrillList({route}) {
    const { changeDate } = route.params;
    const [ monthlyFireDrillNumberOfPeople, setMonthlyFireDrillNumberOfPeople ] = useState('');
    const [ monthlyFireDrillTimeCompleted, setMonthlyFireDrillTimeCompleted ] = useState('');
    const [ monthlyFireDrillNote, setMonthlyFireDrillNote ] = useState('');
    const [ monthlyFireDrillIsCompleted, setMonthlyFireDrillIsCompleted ] = useState('');

    const fireDB = app.firestore().collection('monthlyFireDrill');

    async function addCheck() {
        await fireDB.add({
          monthly_fire_drill_date: changeDate,
          monthly_fire_drill_num_of_people: monthlyFireDrillNumberOfPeople,
          monthly_fire_drill_time_completed: monthlyFireDrillTimeCompleted,
          monthly_fire_drill_note: monthlyFireDrillNote,
          monthly_fire_drill_is_completed: monthlyFireDrillIsCompleted
    });
    setMonthlyFireDrillNumberOfPeople('');
    setMonthlyFireDrillTimeCompleted('');
    setMonthlyFireDrillNote('');
    setMonthlyFireDrillIsCompleted('');
    this.props.navigation.navigate('HealthSafetyChecks');
  }

  return (
    <View>
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Number of People</Text>
            <TextInput
                style={styles.input}
                value={monthlyFireDrillNumberOfPeople}
                onChangeText={setMonthlyFireDrillNumberOfPeople}
            />
            <Text style={styles.bold}>Time Completed</Text>
            <TextInput
                style={styles.input}
                value={monthlyFireDrillTimeCompleted}
                onChangeText={setMonthlyFireDrillTimeCompleted}
            />
            <Text style={styles.bold}>Notes</Text>
            <TextInput
                style={styles.extendedInput}
                multiline={true} 
                numberOfLines={4}
                value={monthlyFireDrillNote}
                onChangeText={setMonthlyFireDrillNote}
            />
            <Text style={styles.bold}>Check Completed</Text>
            <View>
              <CheckBox
                value={monthlyFireDrillIsCompleted}
                onValueChange={(monthlyFireDrillIsCompleted) => setMonthlyFireDrillIsCompleted(monthlyFireDrillIsCompleted)}
                tintColors={{ true: "#0B8FDC", false: "orange"}}
              />
            </View>
            <View style={styles.space}></View>
            <Button 
                title="Submit Check"
                onPress={() => addCheck()}
            />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  extendedInput: {
    backgroundColor: '#DADADA',
    padding: 10,
    borderWidth: 1,
    margin: 12,
    textAlignVertical: 'top'
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: "#DADADA",
    textAlign: 'center',
  }
});