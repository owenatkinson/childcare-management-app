import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default class MonthlyFireDrill extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireDrillDate: '',
      monthlyFireDrillNumberOfPeople: '',
      monthlyFireDrillTimeCompleted: '',
      monthlyFireDrillNote: '',
      monthlyFireDrillIsCompleted: ''
    };
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
          monthlyFireDrillTimeCompleted: user.monthly_fire_drill_time_completed,
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
            <Text style={styles.bold}>Children put into childminder's care at the door</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireDrillNumberOfPeople}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNumberOfPeople')}
            />
            <Text style={styles.bold}>Staggered drop off and pick up</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireDrillTimeCompleted}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillTimeCompleted')}
            />
            <Text style={styles.bold}>Ask if parents, children siblings have symptoms</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireDrillNote}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillNote')}
            />
            <Text style={styles.bold}>Coats and shoes off</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireDrillIsCompleted}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireDrillIsCompleted')}
            />
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