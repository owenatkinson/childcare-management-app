import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import app from '../../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MonthPick from '../../../MonthPick';

export default class ViewInvoice extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('invoiceLogs').orderBy('date_of_invoice', 'desc');
    this.state = {
      isLoading: true,
      invoiceLogs: [],
      date: new Date()
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
    const invoiceLogs = [];
    querySnapshot.forEach((res) => {
        const { child_name, date_of_invoice, invoice_amount } = res.data();
        invoiceLogs.push({
            key: res.id,
            child_name,
            date_of_invoice,
            invoice_amount
        });
    });
    this.setState({
        invoiceLogs,
        isLoading: false
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView edges={['bottom', 'left', 'right']}>
            <FlatList ListHeaderComponent={<MonthPick date={this.state.date} onChange={(newDate) => this.setState({date: newDate})}/>}/>
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
            {
              this.state.invoiceLogs.map((res, i) => {
                if(this.doNumbersMatch(this.getMonth(this.parseDate(this.state.date)), this.getMonth(this.parseDate(res.date_of_invoice))) 
                && this.doNumbersMatch(this.getYear(this.parseDate(this.state.date)), this.getYear(this.parseDate(res.date_of_invoice)))) {
                  return (
                    <ListItem 
                      key={i}
                      onPress={() => {
                        this.props.navigation.navigate("UpdateInvoice", {
                          userkey: res.key
                        });
                      }}                        
                      bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{res.child_name} - £{res.invoice_amount}</ListItem.Title>
                        <ListItem.Subtitle>Date of Expense: {this.convertDate(res.date_of_invoice)}</ListItem.Subtitle>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
     flex: 1,
     paddingBottom: 20
    }
})