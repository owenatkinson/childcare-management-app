import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity, Image } from 'react-native';
import app from '../../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ModalSelector from 'react-native-modal-selector';
const styles = require('../../../Styles/general');

const LogExpense = ({navigation}) => {
    const [ expenseTitle, setExpenseTitle ] = useState('');
    const [ expenseNote, setExpenseNote ] = useState('');
    const [ expenseAmount, setExpenseAmount ] = useState('');
    const [ receiptURL, setReceiptURL ] = useState('');
    const dateOfExpense = useInput(new Date());
    const [image, setImage] = useState(null);
    const [ category, setCategory ] = useState('');

    const convertDate = (dateInput) => {
        return(moment(dateInput).format('D/M/YYYY'));
    }

    const fireDB = app.firestore().collection('expenseLogs');

    async function addExpenseLog() {
        await fireDB.add({
            expense_title: expenseTitle,
            expense_note: expenseNote,
            expense_amount: expenseAmount,
            date_of_expense: dateOfExpense.date,
            receipt_url: receiptURL,
            expense_category: category
        });
        navigation.navigate('Finances');
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        
        if (!result.cancelled) {
            setImage(result.uri);
        }

        uploadImage(result.uri);
    };

    async function uploadImage (file) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            }
            xhr.responseType = 'blob';
            xhr.open('GET', file, true);
            xhr.send(null);
        });
      
        let trimFileName = (/[^/]*$/.exec(file)[0]);
        const ref = app.storage().ref(`/receipts/${trimFileName}`);
        const snapshot = ref.put(blob);
      
        snapshot.on('state_changed', 
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function (error) {
                blob.close();
                return;
            },
            function () {
                snapshot.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    setReceiptURL(downloadURL);
            });
            blob.close();
            return;
          }
        );
    }

    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Categories' },
        { key: index++, label: 'Fuel' },
        { key: index++, label: 'Food' },
        { key: index++, label: 'Stationary' },
        { key: index++, label: 'Fees' },
        { key: index++, label: 'Gifts' },
        { key: index++, label: 'Toys' },
        { key: index++, label: 'Miscellaneous' },
    ];

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Expense Title</Text>
            <TextInput style={styles.input} placeholder={'Expense Title'} label={'Expense Title'} value={expenseTitle} onChangeText={setExpenseTitle}/>
            <Text style={styles.bold}>Expense Category</Text>
            <View>
                <ModalSelector
                    style={styles.dropdown}
                    data={data}
                    onChange={(option)=>{
                        setCategory(option.label);
                    }}>
                    <Text style={styles.dropdownText}>Category: {category}</Text>
                </ModalSelector>
            </View>
            <Text style={styles.bold}>Date of Expense</Text>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={dateOfExpense.showDatepicker}>
                {dateOfExpense.show && (
                    <DateTimePicker
                    testID="dateOfExpense"
                    value={dateOfExpense.date}
                    mode={dateOfExpense.mode}
                    is24Hour={true}
                    display="default"
                    onChange={dateOfExpense.onChange}
                    />
                )}
                <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfExpense.date)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Expense Amount (£)</Text>
            <TextInput style={styles.input} placeholder={'0.00'} label={'Expense Amount'} value={expenseAmount} onChangeText={setExpenseAmount}/>
            <Text style={styles.bold}>Additional Notes</Text>
            <TextInput multiline={true} placeholder={'Insert any additional information'} numberOfLines={4} style={styles.extendedInput} label={'Additional Notes'} value={expenseNote} onChangeText={setExpenseNote}/>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImage}
                    >
                <Text style={styles.buttonText}>Upload a Receipt</Text>
                </TouchableOpacity>
            </View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View style={styles.space}></View>
            <Button 
                title="Log Expense"
                onPress={() => addExpenseLog()}
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

export default LogExpense;