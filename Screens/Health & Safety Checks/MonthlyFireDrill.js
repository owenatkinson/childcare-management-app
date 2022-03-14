import React, { Component } from 'react';
import { Button, View, TouchableOpacity, ScrollView, TextInput, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../Components/firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../Styles/general');

export default class MonthlyFireDrill extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireDrillDate: '',
      monthlyFireDrillNumberOfPeople: '',
      monthlyFireDrillTimeCompleted: new Date(),
      monthlyFireDrillNote: '',
      monthlyFireDrillIsCompleted: '',
      date: new Date(),
      show: false
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      monthlyFireDrillTimeCompleted: currentDate,
      show: false
    });
  };

  convertToTime(dateInput) {
    if (typeof dateInput !== 'string'){
      dateInput = moment(dateInput).format('HH:mm').toString();
    }
    return dateInput;
  }

  convertToTimestamp(dateInput){
    var timeConvert = dateInput.toDate().toLocaleTimeString();
    timeConvert = timeConvert.split(":");
    var time = timeConvert[0] + ":" + timeConvert[1];
    return(time);
  }

  showTimepicker() {
    this.setState({
      show: true
    });
  }

  componentDidMount() {
    const docRef = app.firestore().collection('monthlyFireDrill').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          monthlyFireDrillDate: user.monthly_fire_drill_date,
          monthlyFireDrillNumberOfPeople: user.monthly_fire_drill_num_of_people,
          monthlyFireDrillTimeCompleted: this.convertToTimestamp(user.monthly_fire_drill_time_completed),
          monthlyFireDrillNote: user.monthly_fire_drill_note,
          monthlyFireDrillIsCompleted: user.monthly_fire_drill_is_completed,
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

  editChild() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('monthlyFireDrill').doc(this.state.key);
    docUpdate.set({
      monthly_fire_drill_date: this.state.monthlyFireDrillDate,
      monthly_fire_drill_num_of_people: this.state.monthlyFireDrillNumberOfPeople,
      monthly_fire_drill_time_completed: this.state.monthlyFireDrillTimeCompleted,
      monthly_fire_drill_note: this.state.monthlyFireDrillNote,
      monthly_fire_drill_is_completed: this.state.monthlyFireDrillIsCompleted
    }).then(() => {
      this.setState({
        key: '',
        monthlyFireDrillDate: '',
        monthlyFireDrillNumberOfPeople: '',
        monthlyFireDrillTimeCompleted: '',
        monthlyFireDrillNote: '',
        monthlyFireDrillIsCompleted: '',
        isLoading: false,
      });
      this.props.navigation.navigate('HealthSafetyChecks');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <View>
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.monthlyFireDrillDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.space}></View>
            <Text style={styles.bold}>Number of People:</Text>
            <TextInput
                placeholder={'Number of People present'}
                style={styles.input}
                value={this.state.monthlyFireDrillNumberOfPeople}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNumberOfPeople')}
            />
            <Text style={styles.bold}>Time Completed:</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.showTimepicker()}>
              {this.state.show && (
                  <DateTimePicker
                  testID="monthlyFireDrillTimeCompleted"
                  value={this.state.date}
                  mode='time'
                  display="default"
                  onChange={this.onChange}
                  />
              )}
              <Text style={styles.buttonText}>Choose a Date: {this.convertToTime(this.state.monthlyFireDrillTimeCompleted)}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Additional Notes:</Text>
            <TextInput
                placeholder={'Insert any additional information'}
                style={styles.extendedInput}
                multiline={true}
                numberOfLines={4}
                value={this.state.monthlyFireDrillNote}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNote')}
            />
            <View style={styles.checkBoxPositioning}>
              <Text style={styles.bold}>Check Completed:</Text>
              <CheckBox
                style={styles.checkBox}
                value={this.state.monthlyFireDrillIsCompleted}
                onValueChange={(val) => this.inputEl(val, 'monthlyFireDrillIsCompleted')}
                tintColors={{ true: "#0B8FDC", false: "orange"}}
              />
            </View>
            <View style={styles.space}></View>
            <Button
              title='Update'
              onPress={() => this.editChild()} 
              color="#0B8FDC"
            />
            <View style={styles.space}></View>
            <View style={styles.space}></View>
        </ScrollView>
      </View>
    );
  }
}