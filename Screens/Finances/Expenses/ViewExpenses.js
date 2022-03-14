import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, Text } from 'react-native';
import app from '../../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MonthPick from '../../../Components/MonthPick';
const styles = require('../../../Styles/general');

export default class ViewExpenses extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('expenseLogs').orderBy('date_of_expense', 'desc');
    this.state = {
      isLoading: true,
      expenseLogs: [],
      date: new Date(),
      expenseTotal: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  convertDate = (dateInput) => {
    return(moment(dateInput.toDate()).format('D/M/YYYY'));
  }

  parseDate = (dateInput) => {
    if(dateInput instanceof Date){
      return(moment(dateInput).format('D/M/YYYY'));
    } else {
      return(moment(dateInput.toDate()).format('D/M/YYYY'));
    }
  }

  getMonth(dateInput){
    dateInput = dateInput.split("/");
    var month = dateInput[1];
    return(month);
  }

  getYear(dateInput){
    dateInput = dateInput.split("/");
    var year = dateInput[2];
    return(year);
  }

  doNumbersMatch(num1, num2){
    return (num1 == num2);
  }

  fetchCollection = (querySnapshot) => {
    this.state.expenseTotal = 0;
    const expenseLogs = [];
    querySnapshot.forEach((res) => {
        const { expense_title, expense_note, expense_amount, date_of_expense } = res.data();
        expenseLogs.push({
            key: res.id,
            expense_title,
            expense_note,
            expense_amount,
            date_of_expense
        });
    });
    this.setState({
        expenseLogs,
        isLoading: false
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView edges={['bottom', 'left', 'right']}>
          <FlatList ListHeaderComponent={<MonthPick date={this.state.date} onChange={(newDate) => {this.setState({date: newDate}); this.state.expenseTotal = 0 }}/>}/>
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
            {
              this.state.expenseLogs.map((res, i) => {
                if(this.doNumbersMatch(this.getMonth(this.parseDate(this.state.date)), this.getMonth(this.parseDate(res.date_of_expense))) 
                && this.doNumbersMatch(this.getYear(this.parseDate(this.state.date)), this.getYear(this.parseDate(res.date_of_expense)))) {
                  this.state.expenseTotal += parseFloat(res.expense_amount);
                  return (
                    <ListItem 
                      key={i}
                      onPress={() => {
                        this.props.navigation.navigate("UpdateExpense", {
                          userkey: res.key
                        });
                      }}                        
                      bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{res.expense_title}</ListItem.Title>
                        <ListItem.Subtitle>Date: {this.convertDate(res.date_of_expense)}</ListItem.Subtitle>
                        <ListItem.Subtitle>Amount: £{res.expense_amount}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron 
                        color="black" 
                      />
                    </ListItem>
                  );
                }
              })
            }
        </ScrollView>
        <Text style={styles.boldLargeText}>Month Total: £{parseFloat(this.state.expenseTotal).toFixed(2)}</Text>
      </View>
    );
  }
}