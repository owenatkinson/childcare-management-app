import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

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
        <Text>{this.state.monthlyFireDrillDate}</Text>
        <ScrollView>
          <View style={styles.space}></View>
            <Text style={styles.bold}>Number of People</Text>
            <TextInput
                placeholder={'Number of People present'}
                style={styles.input}
                value={this.state.monthlyFireDrillNumberOfPeople}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNumberOfPeople')}
            />
            <Text style={styles.bold}>Time Completed</Text>
            <View style={styles.dtpicker}>
              <View>
                <Button onPress={() => this.showTimepicker()} title={this.convertToTime(this.state.monthlyFireDrillTimeCompleted)} />
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode='time'
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
            <Text style={styles.bold}>Notes</Text>
            <TextInput
                placeholder={'Insert any additional information'}
                style={styles.extendedInput}
                multiline={true}
                numberOfLines={4}
                value={this.state.monthlyFireDrillNote}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNote')}
            />
            <Text style={styles.bold}>Check Completed</Text>
            <View>
              <CheckBox
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
  container: {
    flex: 1,
    padding: 35
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  },
  dtpicker: {
    margin: 12,
  }
})