import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LogAccidentReport({ navigation }) {
  const [ childName, setChildName ] = useState('');
  const [ accidentNotes, setAccidentNotes ] = useState('');
  const [ accidentLocation, setAccidentLocation ] = useState('');
  const [ accidentDetail, setAccidentDetail ] = useState('');
  const [ accidentAction, setAccidentAction ] = useState('');
  const [ accidentMedicalAttention, setAccidentMedicalAttention ] = useState('');
  const dateOfAccident = useInput(new Date());
  const timeOfAccident = useInput();

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  const convertTime = (dateInput) => {
    return(moment(dateInput).format('HH:mm'));
  }

  const fireDB = app.firestore().collection('accidentReports');

  async function addAccidentReport() {
    await fireDB.add({
      child_name: childName,
      accident_date: dateOfAccident.date,
      accident_time: convertTime(timeOfAccident.date),
      accident_notes: accidentNotes,
      accident_location: accidentLocation,
      accident_detail: accidentDetail,
      accident_action: accidentAction,
      accident_medical_attention: accidentMedicalAttention,
    });
    navigation.navigate('AccidentReports');
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child Name</Text>
      <TextInput style={styles.input} placeholder={'Child Name'} label={'Child Name'} value={childName} onChangeText={setChildName}/>
      <Text style={styles.bold}>Date of Accident</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={dateOfAccident.showDatepicker}>
        {dateOfAccident.show && (
            <DateTimePicker
            testID="dateOfAccident"
            value={dateOfAccident.date}
            mode={dateOfAccident.mode}
            is24Hour={true}
            display="default"
            onChange={dateOfAccident.onChange}
            />
        )}
        <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfAccident.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Accident Time</Text>
      <View>
        <TouchableOpacity
        style={styles.button}
        onPress={timeOfAccident.showTimepicker}>
        {timeOfAccident.show && (
            <DateTimePicker
            testID="timeOfAccident"
            value={timeOfAccident.date}
            mode={timeOfAccident.mode}
            is24Hour={true}
            display="default"
            onChange={timeOfAccident.onChange}
            />
        )}
          <Text style={styles.buttonText}>Choose a Date: {convertTime(timeOfAccident.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Where did the accident occur?</Text>
      <TextInput style={styles.input} placeholder={'Accident Location'} label={'Accident Location'} value={accidentLocation} onChangeText={setAccidentLocation}/>
      <Text style={styles.bold}>What happened?</Text>
      <TextInput multiline={true} placeholder={'Accident Detail'} numberOfLines={4} style={styles.extendedInput} label={'Accident Detail'} value={accidentDetail} onChangeText={setAccidentDetail}/>
      <Text style={styles.bold}>What action was taken?</Text>
      <TextInput style={styles.input} placeholder={'Accident Action'} label={'Accident Action'} value={accidentAction} onChangeText={setAccidentAction}/>
      <Text style={styles.bold}>Was medication attention required?</Text>
      <TextInput style={styles.input} placeholder={'Accident Medical Attention'} label={'Accident Medical Attention'} value={accidentMedicalAttention} onChangeText={setAccidentMedicalAttention}/>
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput multiline={true} placeholder={'Insert any additional information'} numberOfLines={4} style={styles.extendedInput} label={'Accident Notes'} value={accidentNotes} onChangeText={setAccidentNotes}/>
      <View style={styles.space}></View>
      <Button 
        title="Log Accident Report"
        onPress={() => addAccidentReport()}
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
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 15
  },
  space: {
    height: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: '#ee752e',
    margin: 12,
    padding: 10,
    height: 40
  },
  buttonText: {
      fontWeight: 'bold',
      color: '#FFFFFF'
  }
});