import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../firebase';
import "firebase/firestore";

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
        meals: '',
        additionalNotes: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('attendanceRegister').doc(this.props.route.params.userkey)
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
          meals: log.meals_,
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
        meals_: this.state.meals,
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
        meals: '',
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
          <Text style={styles.bold}>Child Name</Text>
          <TextInput
              style={styles.input}
              placeholder={'Child Name'}
              value={this.state.childName}
              onChangeText={(val) => this.inputEl(val, 'childName')}
          />
          <Text style={styles.bold}>Date of Attendance</Text>
          <TextInput
              style={styles.input}
              placeholder={'Date of Attendance'}
              value={this.state.dateOfAttendance}
              onChangeText={(val) => this.inputEl(val, 'dateOfAttendance')}
          />
          <Text style={styles.bold}>Check-in Time</Text>
          <TextInput
              style={styles.input}
              placeholder={'Check-in Time'}
              value={this.state.checkInTime}
              onChangeText={(val) => this.inputEl(val, 'checkInTime')}
          />
          <Text style={styles.bold}>Check-out Time</Text>
          <TextInput
              style={styles.input}
              placeholder={'Check-out Time'}
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
          <Text style={styles.bold}>Temperature Checked</Text>
          <CheckBox
            disabled={false}
            value={this.state.temperatureChecked}
            onValueChange={(val) => this.inputEl(val, 'temperatureChecked')}
            tintColors={{ true: "#0B8FDC", false: "orange"}}
          />
          <Text style={styles.bold}>Meals</Text>
          <TextInput
              style={styles.input}
              placeholder={'Meals'}
              value={this.state.meals}
              onChangeText={(val) => this.inputEl(val, 'meals')}
          />
          <Text style={styles.bold}>Additional Notes</Text>
          <TextInput
              style={styles.input}
              placeholder={'Additional Notes'}
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  }
})