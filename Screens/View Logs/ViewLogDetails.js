import React, { Component } from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../Styles/general');

export default class ViewLogDetails extends Component {
  constructor() {
    super();
    this.state = {
        isLoading: true,
        childName: '',
        dateOfAttendance: '',
        checkInTime: '',
        checkOutTime: '',
        droppedBy: '',
        collectedBy: '',
        temperatureChecked: '',
        // breakfast: '',
        // lunch: '',
        // snack: '',
        additionalNotes: '',
        childNames: [],
        date: new Date(),
        show: false
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfAttendance: this.parseDate(currentDate),
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
    const docRef = app.firestore().collection('attendanceRegister').doc(this.props.route.params.userkey)
    const childNames = [];
    let index = 0;

    app.firestore().collection("children").orderBy("child_name", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          childNames.push({
            key: index++, label: doc.data()["child_name"]
          });
      });
      this.setState({
        childNames: childNames
      })
    });

    docRef.get().then((res) => {
      if (res.exists) {
        const log = res.data();
        this.setState({
          key: res.id,
          childName: log.child_name,
          dateOfAttendance: log.date_of_attendance,
          checkInTime: log.check_in_time,
          checkOutTime: log.check_out_time,
          droppedBy: log.dropped_by,
          collectedBy: log.collected_by,
          temperatureChecked: log.temperature_checked,
          // breakfast: log.breakfast_,
          // lunch: log.lunch_,
          // snack: log.snack_,
          additionalNotes: log.additional_notes,
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

  editLog() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('attendanceRegister').doc(this.state.key);
    docUpdate.set({
        child_name: this.state.childName,
        date_of_attendance: this.state.dateOfAttendance,
        check_in_time: this.state.checkInTime,
        check_out_time: this.state.checkOutTime,
        dropped_by: this.state.droppedBy,
        collected_by: this.state.collectedBy,
        temperature_checked: this.state.temperatureChecked,
        // breakfast_: this.state.breakfast,
        // lunch_: this.state.lunch,
        // snack_: this.state.snack,
        additional_notes: this.state.additionalNotes
    }).then(() => {
      this.setState({
        key: '',
        childName: '',
        dateOfAttendance: '',
        checkInTime: '',
        checkOutTime: '',
        droppedBy: '',
        collectedBy: '',
        temperatureChecked: '',
        // breakfast: '',
        // lunch: '',
        // dinner: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewLogs');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteLog() {
    const docRef = app.firestore().collection('attendanceRegister').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          console.log('Doc deleted.')
          this.props.navigation.navigate('ViewLogs');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteLog()},
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
        <View style={styles.space}></View>
          <Text style={styles.bold}>Child Name: {this.state.childName}</Text>
          <View style={styles.space}></View>
          <Text style={styles.bold}>Date of Attendance</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
            {this.state.show && (
                <DateTimePicker
                testID="dateOfAttendance"
                value={this.state.date}
                mode='date'
                display="default"
                onChange={this.onChange}
                />
            )}
            <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfAttendance}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bold}>Check-in Time</Text>
          <TextInput
              style={styles.input}
              placeholder={'00:00'}
              value={this.state.checkInTime}
              onChangeText={(val) => this.inputEl(val, 'checkInTime')}
          />
          <Text style={styles.bold}>Check-out Time</Text>
          <TextInput
              style={styles.input}
              placeholder={'00:00'}
              value={this.state.checkOutTime}
              onChangeText={(val) => this.inputEl(val, 'checkOutTime')}
          />
          <Text style={styles.bold}>Dropped By</Text>
          <TextInput
              style={styles.input}
              placeholder={'Dropped By'}
              value={this.state.droppedBy}
              onChangeText={(val) => this.inputEl(val, 'droppedBy')}
          />
          <Text style={styles.bold}>Collected By</Text>
          <TextInput
              style={styles.input}
              placeholder={'Collected By'}
              value={this.state.collectedBy}
              onChangeText={(val) => this.inputEl(val, 'collectedBy')}
          />
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.bold}>Temperature Checked:</Text>
            <CheckBox
              style={{marginTop:15}}
              disabled={false}
              value={this.state.temperatureChecked}
              onValueChange={(val) => this.inputEl(val, 'temperatureChecked')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          {/* <Text style={styles.boldUnderCheckbox}>Meals</Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.standard}>Breakfast:</Text>
            <CheckBox
              style={{marginTop:5}}
              disabled={false}
              value={this.state.breakfast}
              onValueChange={(val) => this.inputEl(val, 'breakfast')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.standard}>Lunch:</Text>
            <CheckBox
              style={{marginTop:5}}
              disabled={false}
              value={this.state.lunch}
              onValueChange={(val) => this.inputEl(val, 'lunch')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.standard}>Snack:</Text>
            <CheckBox
              style={{marginTop:5}}
              disabled={false}
              value={this.state.snack}
              onValueChange={(val) => this.inputEl(val, 'snack')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View> */}
          <Text style={styles.boldTextCheckbox}>Additional Notes</Text>
          <TextInput
              style={styles.extendedInput} 
              multiline={true} 
              numberOfLines={4}
              placeholder={'Insert any additional information'}
              value={this.state.additionalNotes}
              onChangeText={(val) => this.inputEl(val, 'additionalNotes')}
          />
          <View style={styles.space}></View>
          <Button
            title='Update'
            onPress={() => this.editLog()} 
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