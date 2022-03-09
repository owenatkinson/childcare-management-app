import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import app from '../../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector'
const styles = require('../../../Styles/general');

const LogInvoice = ({navigation}) => {
    const [ childName, setChildName ] = useState('');
    const [ invoiceAmount, setInvoiceAmount ] = useState('');
    const dateOfInvoice = useInput(new Date());
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

    const convertDate = (dateInput) => {
        return(moment(dateInput).format('D/M/YYYY'));
    }

    const fireDB = app.firestore().collection('invoiceLogs');

    async function addInvoiceLog() {
        await fireDB.add({
            child_name: childName,
            invoice_amount: invoiceAmount,
            date_of_invoice: dateOfInvoice.date,
        });
        navigation.navigate('Finances');
    }

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Child Name</Text>
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
            <Text style={styles.bold}>Date of Invoice</Text>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={dateOfInvoice.showDatepicker}>
                {dateOfInvoice.show && (
                    <DateTimePicker
                    testID="dateOfExpense"
                    value={dateOfInvoice.date}
                    mode={dateOfInvoice.mode}
                    is24Hour={true}
                    display="default"
                    onChange={dateOfInvoice.onChange}
                    />
                )}
                <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfInvoice.date)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Invoice Amount (£)</Text>
            <TextInput style={styles.input} placeholder={'0.00'} label={'Expense Amount'} value={invoiceAmount} onChangeText={setInvoiceAmount}/>
            <View style={styles.space}></View>
            <Button 
                title="Log Invoice"
                onPress={() => addInvoiceLog()}
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    return {
        date,
        showDatepicker,
        show,
        mode,
        onChange
    }
}

export default LogInvoice;