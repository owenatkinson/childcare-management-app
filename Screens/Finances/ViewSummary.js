import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';

export default class ViewExpenses extends Component {
    constructor() {
        super();
        this.docs = app.firestore().collection('expenseLogs').orderBy('date_of_expense', 'desc');
        this.state = {
        isLoading: true,
        date: new Date(),
        show: false
        };
    }

  render() {

  }
}

const styles = StyleSheet.create({

})