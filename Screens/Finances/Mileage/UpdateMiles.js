import React, { Component } from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import app from '../../../Components/firebase';
import "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { parseDate, convertDate, convertToTimestamp } from '../../../Components/Functionality';
const styles = require('../../../Styles/general');

export default class UpdateMiles extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dateOfMileage: '',
      mileageAmount: '',
      mileageRate: '',
      milesTravelled: '',
      date: new Date(),
      show: false
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfMileage: convertDate(currentDate),
      show: false
    });
  };

  showDatepicker() {
    this.setState({
      show: true
    });
  }

  componentDidMount() {
    const docRef = app.firestore().collection('mileageLogs').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          dateOfMileage: parseDate(user.date_of_mileage),
          mileageAmount: user.mileage_amount,
          mileageRate: user.mileage_rate,
          milesTravelled: user.miles_travelled,
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

  editMileageLog() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('mileageLogs').doc(this.state.key);
    docUpdate.set({
        date_of_mileage: convertToTimestamp(this.state.dateOfMileage),
        mileage_amount: this.state.mileageAmount,
        mileage_rate: this.state.mileageRate,
        miles_travelled: this.state.milesTravelled
    }).then(() => {
      this.setState({
        key: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewMiles');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteMileageLog() {
    const docRef = app.firestore().collection('mileageLogs').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          this.props.navigation.navigate('ViewMiles');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteMileageLog()},
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
                <Text style={styles.bold}>Miles Travelled</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Miles Travelled'}
                    value={this.state.milesTravelled}
                    onChangeText={(val) => this.inputEl(val, 'milesTravelled')}
                />
                <Text style={styles.bold}>Rate (pence per mile)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'0.00'}
                    value={this.state.mileageRate}
                    onChangeText={(val) => this.inputEl(val, 'mileageRate')}
                />
                <View>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setState({
                            mileageAmount: parseFloat((this.state.milesTravelled) * parseFloat(this.state.mileageRate)).toFixed(2)
                        });
                    }}>
                    <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bold}>Mileage Amount: £{this.state.mileageAmount}</Text>
                <View style={styles.space}></View>
                <Text style={styles.bold}>Date of Mileage Expense:</Text>
                <View>
                  <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
                  {this.state.show && (
                      <DateTimePicker
                      testID="dateOfMileage"
                      value={this.state.date}
                      mode='date'
                      display="default"
                      onChange={this.onChange}
                      />
                  )}
                  <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfMileage}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.space}></View>
            <Button
              style={styles.buttonText}
              title='Update'
              onPress={() => this.editMileageLog()} 
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