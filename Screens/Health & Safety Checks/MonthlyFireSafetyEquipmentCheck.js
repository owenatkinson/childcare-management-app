import React, { Component } from 'react';
import { Button, View, ScrollView, TextInput, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../firebase';
import "firebase/firestore";
const styles = require('../../Styles/general');

export default class MonthlyFireSafetyEquipmentCheck extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      monthlyFireSafetyDate: '',
      monthlyFireSafetyNote: '',
      monthlyFireSafetyIsCompleted: ''
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
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.monthlyFireSafetyDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.space}></View>
          <Text style={styles.bold}>Notes:</Text>
          <TextInput
              style={styles.extendedInput}
              multiline={true} 
              numberOfLines={4}
              value={this.state.monthlyFireSafetyNote}
              onChangeText={(val) => this.inputEl(val, 'monthlyFireSafetyNote')}
          />
          <View style={styles.checkBoxPositioning}>
              <Text style={styles.bold}>Check Completed:</Text>
              <CheckBox
                style={styles.checkBox}
                value={this.state.monthlyFireSafetyIsCompleted}
                onValueChange={(val) => this.inputEl(val, 'monthlyFireSafetyIsCompleted')}
                tintColors={{ true: "#0B8FDC", false: "orange"}}
              />
          </View>
          <View style={styles.space}></View>
          <Button
            title='Update'
            onPress={() => this.editChild()} 
            color="#0B8FDC"
          />
        </ScrollView>
      </View>
    );
  }
}