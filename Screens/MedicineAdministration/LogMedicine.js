import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector'

export default function LogMedicine({ navigation }) {
    const [ childName, setChildName ] = useState('');
    const [ medicineTitle, setMedicineTitle ] = useState('');
    const medicineDate = useInput(new Date());
    const medicineTime = useInput(new Date());
    const [ medicineReason, setMedicineReason ] = useState('');
    const [ medicineNotes, setMedicineNotes ] = useState('');
    // const [childNames, setChildNames] = useState([]);

    // function componentDidMount() {
    //   this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
    // }

    // const fetchCollection = (querySnapshot) => {
    //   const childNames = [];
    //   let index = 0;
    //   app.firestore().collection("children").where("child_is_active", "==", true).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         childNames.push({
    //           key: index++, label: doc.data()["child_name"]
    //         });
    //     });
    //     setChildNames(childNames);
    //     console.log("1",childNames);
    //   });
    // }
  
    const convertDate = (dateInput) => {
        return(moment(dateInput).format('D/M/YYYY'));
    }
  
    const convertTime = (dateInput) => {
      return(moment(dateInput).format('HH:mm'));
    }
  
    const fireDB = app.firestore().collection('medicineAdministration');
  
    async function addLog() {
      await fireDB.add({
        child_name: childName,
        medicine_title: medicineTitle,
        medicine_date: medicineDate.date,
        medicine_time: convertTime(medicineTime.date),
        medicine_reason: medicineReason,
        medicine_notes: medicineNotes
      });
      navigation.navigate('MedicineAdministration');
    }
  
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Child's Name</Text>
        {/* <View>
          <ModalSelector
            data={childNames}
            initValue="Select a Child"
            onChange={(option)=>{ this.setState({activeChildName:option.label})}}/>
          </View> */}
        <TextInput style={styles.input} placeholder={'Child\'s Name'} value={childName} onChangeText={setChildName}/>
        <Text style={styles.bold}>Medicine</Text>
        <TextInput style={styles.input} placeholder={'Medicine'} value={medicineTitle} onChangeText={setMedicineTitle}/>
        <Text style={styles.bold}>Date Administered</Text>
        <View>
          <TouchableOpacity
          style={styles.button}
          onPress={medicineDate.showDatepicker}>
          {medicineDate.show && (
              <DateTimePicker
              testID="medicineDate"
              value={medicineDate.date}
              mode={medicineDate.mode}
              is24Hour={true}
              display="default"
              onChange={medicineDate.onChange}
              />
          )}
            <Text style={styles.buttonText}>Choose a Date: {convertDate(medicineDate.date)}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Time Administered</Text>
        <View>
          <TouchableOpacity
          style={styles.button}
          onPress={medicineTime.showTimepicker}>
          {medicineTime.show && (
              <DateTimePicker
              testID="medicineTime"
              value={medicineTime.date}
              mode={medicineTime.mode}
              is24Hour={true}
              display="default"
              onChange={medicineTime.onChange}
              />
          )}
            <Text style={styles.buttonText}>Choose a Date: {convertTime(medicineTime.date)}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>What was the reason for administering medication?</Text>
        <TextInput style={styles.input} placeholder={'Reason for medicine administration'} value={medicineReason} onChangeText={setMedicineReason}/>
        <Text style={styles.bold}>Additional Notes</Text>
        <TextInput multiline={true} placeholder={'Insert any additional information'} numberOfLines={4} style={styles.extendedInput} value={medicineNotes} onChangeText={setMedicineNotes}/>
        <View style={styles.space}></View>
        <Button 
          title="Log Medicine Administration"
          onPress={() => addLog()}
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