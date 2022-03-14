import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, Text } from 'react-native';
import app from '../../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MonthPick from '../../../Components/MonthPick';
import { parseDate, doNumbersMatch, getMonth, getYear, convertDateCheckType } from '../../../Components/Functionality';
const styles = require('../../../Styles/general');

export default class ViewInvoice extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('invoiceLogs').orderBy('date_of_invoice', 'desc');
    this.state = {
      isLoading: true,
      invoiceLogs: [],
      date: new Date(),
      invoiceAmount: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    this.state.invoiceAmount = 0;
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
          <FlatList ListHeaderComponent={<MonthPick date={this.state.date} onChange={(newDate) => {this.setState({date: newDate}); this.state.invoiceAmount = 0 }}/>}/>
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
            {
              this.state.invoiceLogs.map((res, i) => {
                if(doNumbersMatch(getMonth(convertDateCheckType(this.state.date)), getMonth(convertDateCheckType(res.date_of_invoice))) 
                && doNumbersMatch(getYear(convertDateCheckType(this.state.date)), getYear(convertDateCheckType(res.date_of_invoice)))) {
                  this.state.invoiceAmount += parseFloat(res.invoice_amount);
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
                        <ListItem.Title>{res.child_name} - £{parseFloat(res.invoice_amount).toFixed(2)}</ListItem.Title>
                        <ListItem.Subtitle>Date of Expense: {parseDate(res.date_of_invoice)}</ListItem.Subtitle>
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
        <Text style={styles.boldLargeText}>Month Total: £{parseFloat(this.state.invoiceAmount).toFixed(2)}</Text>
      </View>
    );
  }
}