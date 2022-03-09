import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import app from '../../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../../Styles/general');

const LogMiles = ({navigation}) => {
    const [ mileageAmount, setMileageAmount ] = useState(0);
    const [ mileageRate, setMileageRate ] = useState('');
    const [ milesTravelled, setMilesTravelled ] = useState('');
    const dateOfMileage = useInput(new Date());
    const fireDB = app.firestore().collection('mileageLogs');

    const convertDate = (dateInput) => {
        return(moment(dateInput).format('D/M/YYYY'));
    }

    async function addMileageLog() {
        await fireDB.add({
            mileage_amount: mileageAmount,
            mileage_rate: mileageRate,
            miles_travelled: milesTravelled,
            date_of_mileage: dateOfMileage.date
        });
        navigation.navigate('Finances');
    }
    
    return (
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Miles Travelled</Text>
            <TextInput style={styles.input} placeholder={'Miles Travelled'} value={milesTravelled} onChangeText={setMilesTravelled}/>
            <Text style={styles.bold}>Rate (pence per mile)</Text>
            <TextInput style={styles.input} placeholder={'0.00'} value={mileageRate} onChangeText={setMileageRate}/>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setMileageAmount(parseFloat((milesTravelled) * parseFloat(mileageRate)).toFixed(2))
                }}>
                <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Mileage Amount: £{mileageAmount}</Text>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Date of Mileage Expense:</Text>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={dateOfMileage.showDatepicker}>
                {dateOfMileage.show && (
                    <DateTimePicker
                    testID="dateOfExpense"
                    value={dateOfMileage.date}
                    mode={dateOfMileage.mode}
                    is24Hour={true}
                    display="default"
                    onChange={dateOfMileage.onChange}
                    />
                )}
                <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfMileage.date)}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
            <Button 
                title="Log Mileage"
                onPress={() => addMileageLog()}
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

export default LogMiles;