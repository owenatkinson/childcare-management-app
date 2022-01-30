import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../../firebase';
import "firebase/firestore";

export default function AddMonthlyFireSafetyEquipmentList({route}) {
    const { changeDate } = route.params;
    const [ monthlyFireSafetyNote, setMonthlyFireSafetyNote ] = useState('');
    const [ monthlyFireSafetyIsCompleted, setMonthlyFireSafetyIsCompleted ] = useState('');

    const fireDB = app.firestore().collection('monthlyFireSafetyEquipmentCheck');

    async function addCheck() {
        await fireDB.add({
          monthly_fire_safety_date: changeDate,
          monthly_fire_safety_note: monthlyFireSafetyNote,
          monthly_fire_safety_is_completed: monthlyFireSafetyIsCompleted
    });
    setMonthlyFireSafetyNote('');
    setMonthlyFireSafetyIsCompleted('');
    this.props.navigation.navigate('HealthSafetyChecks');
  }

  return (
    <View>
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Notes</Text>
            <TextInput
                style={styles.extendedInput}
                multiline={true} 
                numberOfLines={4}
                value={monthlyFireSafetyNote}
                onChangeText={setMonthlyFireSafetyNote}
            />
            <Text style={styles.bold}>Check Completed</Text>
            <View>
              <CheckBox
                value={monthlyFireSafetyIsCompleted}
                onValueChange={(monthlyFireSafetyIsCompleted) => setMonthlyFireSafetyIsCompleted(monthlyFireSafetyIsCompleted)}
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