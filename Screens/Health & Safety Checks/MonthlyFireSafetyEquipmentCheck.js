import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default class MonthlyFireSafetyEquipmentCheck extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireSafetyDate: '',
      monthlyFireSafetyNote: '',
      monthlyFireDSafetyIsCompleted: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('monthlyFireSafetyEquipmentCheck').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          monthlyFireSafetyDate: user.monthly_fire_safety_date,
          monthlyFireSafetyNote: user.monthly_fire_safety_note,
          monthlyFireSafetyIsCompleted: user.monthly_fire_safety_is_completed,
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
    const docUpdate = app.firestore().collection('monthlyFireSafetyEquipmentCheck').doc(this.state.key);
    docUpdate.set({
      monthly_fire_safety_date: this.state.monthlyFireSafetyDate,
      monthly_fire_safety_note: this.state.monthlyFireSafetyNote,
      monthly_fire_safety_is_completed: this.state.monthlyFireSafetyIsCompleted
    }).then(() => {
      this.setState({
        key: '',
        monthlyFireSafetyDate: '',
        monthlyFireSafetyNote: '',
        monthlyFireSafetyIsCompleted: '',
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
        <Text>{this.state.monthlyFireSafetyDate}</Text>
        <ScrollView>
          <View style={styles.space}></View>
            <Text style={styles.bold}>Notes</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireSafetyNote}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireSafetyNote')}
            />
            <Text style={styles.bold}>Is Completed</Text>
            <TextInput
                style={styles.input}
                value={this.state.monthlyFireSafetyIsCompleted}
                onChangeText={(val) => this.inputEl(val, 'monthlyFireSafetyIsCompleted')}
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