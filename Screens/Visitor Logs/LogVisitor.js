import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LogVisitor({navigation}) {
  const [ visitorName, setVisitorName ] = useState('');
  const [ visitPurpose, setVisitPurpose ] = useState('');

  const input = useInput(new Date());
  const input2 = useInput();
  const input3 = useInput();

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  const convertTime = (dateInput) => {
    return(moment(dateInput).format('HH:mm'));
  }

  const fireDB = app.firestore().collection('visitorLogs');

  async function addVisitorLog() {
    await fireDB.add({
      visitor_name: visitorName,
      date_of_visit: convertDate(input.date),
      time_in: convertTime(input2.date),
      time_out: convertTime(input3.date),
      visit_purpose: visitPurpose
    });
    navigation.navigate('VisitorLogs');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Visitor Name</Text>
        <TextInput style={styles.input} label={'Visitor Name'} value={visitorName} onChangeText={setVisitorName}/>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Date of Visit</Text>
      <View>
        <Button 
          onPress={input.showDatepicker} 
          title={"Choose a Date: " + convertDate(input.date)} />
          {input.show && (
              <DateTimePicker
              testID="dateTimePicker1"
              value={input.date}
              mode={input.mode}
              is24Hour={true}
              display="default"
              onChange={input.onChange}
              />
          )}
      </View>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Time In</Text>
      <View>
        <Button 
            onPress={input2.showTimepicker} 
            title={"Choose a Time: " + convertTime(input2.date)} />
            {input2.show && (
                <DateTimePicker
                testID="dateTimePicker2"
                value={input2.date}
                mode={input2.mode}
                is24Hour={true}
                display="default"
                onChange={input2.onChange}
                />
            )}
      </View>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Time Out</Text>
        <Button
            onPress={input3.showTimepicker} 
            title={"Choose a Time: " + convertTime(input3.date)} />
            {input3.show && (
                <DateTimePicker
                testID="dateTimePicker3"
                value={input3.date}
                mode={input3.mode}
                is24Hour={true}
                display="default"
                onChange={input3.onChange}
                />
            )}
      <View style={styles.space}></View>
      <View style={styles.space}></View>
        <Text style={styles.bold}>Purpose of Visit</Text>
        <TextInput multiline={true} numberOfLines={4} style={styles.extendedInput} label={'Purpose of Visit'} value={visitPurpose} onChangeText={setVisitPurpose}/>
      <View style={styles.space}></View>
      <Button 
          title="Log Visitor"
          onPress={() => addVisitorLog()}
        />
    </ScrollView>
  );
}

function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
  };
  const showDatepicker = () => {
      showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  }
  return {
      date,
      showDatepicker,
      showTimepicker,
      show,
      mode,
      onChange
  }
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
  }
});