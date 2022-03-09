import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector'
const styles = require('../../Styles/general');

function AttendanceRegister({ navigation }) {
  const [ additionalNotes, setAdditionalNotes ] = useState('');
  const [ childName, setChildName ] = useState('');
  const [ collectedBy, setCollectedBy ] = useState('');
  const [ droppedBy, setDroppedBy ] = useState('');
  const [ temperatureChecked, setTemperatureChecked ] = useState('');
  // const [ breakfast, setBreakfast ] = useState('');
  // const [ lunch, setLunch ] = useState('');
  // const [ snack, setSnack ] = useState('');
  const dateOfAttendance = useInput(new Date());
  const checkInTime = useInput();
  const checkOutTime = useInput();
  const [childNameArr, setChildNameArr] = useState([]);

  useEffect(() => {
    const childNames = [];
    setChildNameArr([]);
    setChildName();
    let index = 0;

    app.firestore().collection("children").orderBy("child_name", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          childNames.push({
            key: index++, label: doc.data()["child_name"]
          });
      });
      setChildNameArr(childNames);
    });
  },[])

  const fireDB = app.firestore().collection('attendanceRegister');

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  const convertTime = (dateInput) => {
    return(moment(dateInput).format('HH:mm'));
  }

  async function addAttendanceLog() {
    await fireDB.add({
      additional_notes: additionalNotes,
      check_in_time: convertTime(checkInTime.date),
      check_out_time: convertTime(checkOutTime.date),
      child_name: childName,
      collected_by: collectedBy,
      date_of_attendance: convertDate(dateOfAttendance.date),
      dropped_by: droppedBy,
      // breakfast_: breakfast,
      // snack_: snack,
      // lunch_: lunch,
      temperature_checked: temperatureChecked
    });
    navigation.navigate('Home');
  }

  return (
    <ScrollView>
      <Text style={styles.bold}>Child Name:</Text>
      <View>
        <ModalSelector
            style={styles.dropdown}
            data={childNameArr}
            onChange={(option)=>{
              setChildName(option.label);
            }}>
            <Text style={styles.dropdownText}>Select a Child: {childName}</Text>
        </ModalSelector>
      </View>
      <Text style={styles.bold}>Date of Attendance:</Text>
      <View>
        <TouchableOpacity
        style={styles.button}
        onPress={dateOfAttendance.showDatepicker}>
        {dateOfAttendance.show && (
            <DateTimePicker
            testID="dateOfAttendance"
            value={dateOfAttendance.date}
            mode={dateOfAttendance.mode}
            is24Hour={true}
            display="default"
            onChange={dateOfAttendance.onChange}
            />
        )}
          <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfAttendance.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Check In Time:</Text>
      <View>
        <TouchableOpacity
        style={styles.button}
        onPress={checkInTime.showTimepicker}>
        {checkInTime.show && (
            <DateTimePicker
            testID="checkInTime"
            value={checkInTime.date}
            mode={checkInTime.mode}
            is24Hour={true}
            display="default"
            onChange={checkInTime.onChange}
            />
        )}
          <Text style={styles.buttonText}>Choose a Time: {convertTime(checkInTime.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Check Out Time:</Text>
      <View>
        <TouchableOpacity
        style={styles.button}
        onPress={checkOutTime.showTimepicker}>
        {checkOutTime.show && (
            <DateTimePicker
            testID="checkOutTime"
            value={checkOutTime.date}
            mode={checkOutTime.mode}
            is24Hour={true}
            display="default"
            onChange={checkOutTime.onChange}
            />
        )}
          <Text style={styles.buttonText}>Choose a Time: {convertTime(checkOutTime.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Dropped By:</Text>
      <TextInput style={styles.input} placeholder={'Dropped By'} label={'Dropped By'} value={droppedBy} onChangeText={setDroppedBy}/>
      <Text style={styles.bold}>Collected By:</Text>
      <TextInput style={styles.input} placeholder={'Collected By'} label={'Collected By'} value={collectedBy} onChangeText={setCollectedBy}/>
      <View style={styles.checkBoxPositioning}>
        <Text style={styles.bold}>Temperature Checked:</Text>
        <CheckBox
          style={styles.checkBox}
          disabled={false}
          value={temperatureChecked}
          onValueChange={setTemperatureChecked}
          tintColors={{ true: "#0B8FDC", false: "orange"}}
        />
      </View>
      {/* <Text style={styles.bold}>Meals</Text>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={styles.standard}>Breakfast:</Text>
        <CheckBox
          style={{marginTop:5}}
          disabled={false}
          value={breakfast}
          onValueChange={setBreakfast}
          tintColors={{ true: "#0B8FDC", false: "orange"}}
        />
      </View>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={styles.standard}>Lunch:</Text>
        <CheckBox
          style={{marginTop:5}}
          disabled={false}
          value={lunch}
          onValueChange={setLunch}
          tintColors={{ true: "#0B8FDC", false: "orange"}}
        />
      </View>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={styles.standard}>Snack:</Text>
        <CheckBox
          style={{marginTop:5}}
          disabled={false}
          value={snack}
          onValueChange={setSnack}
          tintColors={{ true: "#0B8FDC", false: "orange"}}
        />
      </View> */}
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput style={styles.extendedInput} placeholder={'Insert any additional information'} multiline={true} numberOfLines={4} label={'Additional Notes'} value={additionalNotes} onChangeText={setAdditionalNotes}/>
      <View style={styles.space}></View>
      <Button 
          title="Log Attendance"
          onPress={() => addAttendanceLog()}
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

export default AttendanceRegister;