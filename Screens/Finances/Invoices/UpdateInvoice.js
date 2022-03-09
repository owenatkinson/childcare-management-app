import React, { Component } from 'react';
import { Button, View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from 'react-native';
import app from '../../../firebase';
import "firebase/firestore";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = require('../../../Styles/general');

export default class UpdateInvoice extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      childName: '',
      dateOfInvoice: '',
      invoiceAmount: '',
      childNames: [],
      date: new Date(),
      show: false
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfInvoice: this.parseDate(currentDate),
      show: false
    });
  };

  showDatepicker() {
    this.setState({
      show: true
    });
  }

  convertDate(dateInput){
    return(moment(dateInput.toDate()).format('D/M/YYYY'));
  }

  parseDate(dateInput){
    return(moment(dateInput).format('D/M/YYYY'));
  }

  convertToTimestamp(dateInput){
      dateInput = dateInput.split("/");
      var newDate = new Date( dateInput[2], dateInput[1] - 1, dateInput[0]);
      return(newDate);
  }

  componentDidMount() {
    const docRef = app.firestore().collection('invoiceLogs').doc(this.props.route.params.userkey)
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
        const user = res.data();
        this.setState({
          key: res.id,
          dateOfInvoice: this.convertDate(user.date_of_invoice),
          childName: user.child_name,
          invoiceAmount: user.invoice_amount,
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

  editInvoiceLog() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('invoiceLogs').doc(this.state.key);
    docUpdate.set({
        date_of_invoice: this.convertToTimestamp(this.state.dateOfInvoice),
        child_name: this.state.childName,
        invoice_amount: this.state.invoiceAmount
    }).then(() => {
      this.setState({
        key: '',
        dateOfInvoice: '',
        childName: '',
        invoiceAmount: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewInvoice');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteInvoiceLog() {
    const docRef = app.firestore().collection('invoiceLogs').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          this.props.navigation.navigate('ViewInvoice');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteInvoiceLog()},
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
            <Text style={styles.bold}>Date of Invoice</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.showDatepicker()}>
              {this.state.show && (
                  <DateTimePicker
                  testID="dateOfInvoice"
                  value={this.state.date}
                  mode='date'
                  display="default"
                  onChange={this.onChange}
                  />
              )}
              <Text style={styles.buttonText}>Choose a Date: {this.state.dateOfInvoice}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bold}>Invoice Amount</Text>
            <TextInput
                style={styles.input}
                placeholder={'0.00'}
                value={this.state.invoiceAmount}
                onChangeText={(val) => this.inputEl(val, 'invoiceAmount')}
            />
            <View style={styles.space}></View>
            <Button
              style={styles.buttonText}
              title='Update'
              onPress={() => this.editInvoiceLog()} 
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