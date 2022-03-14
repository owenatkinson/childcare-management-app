import React, { Component } from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import app from '../../Components/firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../Styles/general');

export default class UpdateMedicineLog extends Component {
    constructor() {
    super();
    this.state = {
            isLoading: true,
            childName: '',
            medicineDate: new Date(),
            medicineTitle: '',
            medicineTime: '',
            medicineReason: '',
            medicineNotes: '',
            date: new Date(),
            show: false
        };
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({
          date: currentDate,
          medicineDate: this.parseDate(currentDate),
          show: false
        });
      };
    
    showDatepicker() {
        this.setState({
            show: true
        });
    }
    
    parseDate(dateInput){
        return(moment(dateInput).format('D/M/YYYY'));
    }

    convertDate(dateInput){
        return(moment(dateInput.toDate()).format('D/M/YYYY'));
    }

    convertToTimestamp(dateInput){
        dateInput = dateInput.split("/");
        var newDate = new Date( dateInput[2], dateInput[1] - 1, dateInput[0]);
        return(newDate);
    }

    componentDidMount() {
    const docRef = app.firestore().collection('medicineAdministration').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
        if (res.exists) {
        const user = res.data();
        this.setState({
            key: res.id,
            childName: user.child_name,
            medicineDate: this.convertDate(user.medicine_date),
            medicineTitle: user.medicine_title,
            medicineTime: user.medicine_time,
            medicineReason: user.medicine_reason,
            medicineNotes: user.medicine_notes,
            isLoading: false
        });
        } else {
        console.log("No document found.");
        }
    });
    }

    inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    }

    editAccidentReport() {
    this.setState({
        isLoading: true,
    });
    const docUpdate = app.firestore().collection('medicineAdministration').doc(this.state.key);
    docUpdate.set({
        child_name: this.state.childName,
        medicine_date: this.convertToTimestamp(this.state.medicineDate),
        medicine_title: this.state.medicineTitle,
        medicine_time: this.state.medicineTime,
        medicine_reason: this.state.medicineReason,
        medicine_notes: this.state.medicineNotes
    }).then(() => {
        this.setState({
        key: '',
        childName: '',
        medicineTitle: '',
        medicineTime: '',
        medicineReason: '',
        medicineNotes: '',
        isLoading: false
        });
        this.props.navigation.navigate('ViewMedicalInfo');
    })
    .catch((error) => {
        console.error(error);
        this.setState({
        isLoading: false,
        });
    });
    }

    deleteAccidentReport() {
    const docRef = app.firestore().collection('medicineAdministration').doc(this.props.route.params.userkey)
        docRef.delete().then((res) => {
            this.props.navigation.navigate('ViewMedicalInfo');
        })
    }

    alertDialog=()=>{
    Alert.alert(
        'Delete',
        'Really?',
        [
        {text: 'Yes', onPress: () => this.deleteAccidentReport()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
        ],
        { 
        cancelable: true 
        }
    );
    }

    render() {
    return (
        <ScrollView>
            <Text style={styles.bold}>Child Name: {this.state.childName}</Text>
            <View style={styles.space}></View>
            <Text style={styles.bold}>Medicine</Text>
            <TextInput
                style={styles.input}
                placeholder={'Medicine'}
                value={this.state.medicineTitle}
                onChangeText={(val) => this.inputEl(val, 'medicineTitle')}
            />
            <Text style={styles.bold}>Date Administered</Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
                {this.state.show && (
                    <DateTimePicker
                    testID="accidentDate"
                    value={this.state.date}
                    mode='date'
                    display="default"
                    onChange={this.onChange}
                    />
                )}
                <Text style={styles.buttonText}>Choose a Date: {this.state.medicineDate.toString()}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Time Administered</Text>
            <TextInput
                style={styles.input}
                placeholder={'00:00'}
                value={this.state.medicineTime}
                onChangeText={(val) => this.inputEl(val, 'medicineTime')}
            />
            <Text style={styles.bold}>What was the reason for administering medication?</Text>
            <TextInput
                style={styles.input}
                placeholder={'Reason for medicine administration'}
                value={this.state.medicineReason}
                onChangeText={(val) => this.inputEl(val, 'medicineReason')}
            />
            <Text style={styles.bold}>Additional Notes</Text>
            <TextInput
                multiline={true} 
                numberOfLines={4}
                style={styles.extendedInput}
                placeholder={'Insert any additional information'}
                value={this.state.medicineNotes}
                onChangeText={(val) => this.inputEl(val, 'medicineNotes')}
            />
            <View style={styles.space}></View>
            <Button
                title='Update'
                onPress={() => this.editAccidentReport()} 
                color="#0B8FDC"
            />
            <View style={styles.space}></View>
            <Button
                title='Delete'
                onPress={this.alertDialog}
                color="#EE752E"
            />
        </ScrollView>
    );
    }
}