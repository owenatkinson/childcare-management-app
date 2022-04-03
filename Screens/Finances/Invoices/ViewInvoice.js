import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, FlatList, Text } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import MonthPick from "../../../Components/MonthPick";
import { parseDate, doNumbersMatch, getMonth, getYear, convertDateCheckType } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class ViewInvoice extends Component {
  constructor() {
    super();
    // Query the database to gather all invoice data and store in a variable
    this.docs = app
      .firestore()
      .collection("invoiceLogs")
      .orderBy("date_of_invoice", "desc");
    // Initialising the state value of variables
    this.state = {
      invoiceLogs: [],
      date: new Date(),
      invoiceAmount: 0,
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Query the database to gather invoice data, store this in the invoiceLogs array and set the state value
  fetchCollection = (querySnapshot) => {
    this.state.invoiceAmount = 0;
    const invoiceLogs = [];
    querySnapshot.forEach((result) => {
      const { child_name, date_of_invoice, invoice_amount } = result.data();
      invoiceLogs.push({
        key: result.id,
        child_name,
        date_of_invoice,
        invoice_amount,
      });
    });
    this.setState({
      invoiceLogs: invoiceLogs,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        {/* MonthPick used to filter invoice logs into a month & year */}
        <SafeAreaView edges={["bottom", "left", "right"]}>
          <FlatList
            ListHeaderComponent={
              <MonthPick
                date={this.state.date}
                onChange={(newDate) => {
                  this.setState({ date: newDate });
                  this.state.invoiceAmount = 0;
                }}
              />
            }
          />
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
          {/* For each invoice in invoiceLogs */}
          {this.state.invoiceLogs.map((result, id) => {
            // Only display invoice logs that match the year and month values of the MonthPick component
            if (
              doNumbersMatch(
                getMonth(convertDateCheckType(this.state.date)),
                getMonth(convertDateCheckType(result.date_of_invoice))
              ) &&
              doNumbersMatch(
                getYear(convertDateCheckType(this.state.date)),
                getYear(convertDateCheckType(result.date_of_invoice))
              )
            ) {
              // Increment the invoiceAmount by accumulatively adding the invoice_amount of each expense
              this.state.invoiceAmount += parseFloat(result.invoice_amount);
              return (
                <ListItem
                  key={id}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateInvoice", {
                      userkey: result.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.navyBoldText}>
                      {result.child_name} - £
                      {parseFloat(result.invoice_amount).toFixed(2)}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.navynavyStandardTextText}>
                      Date of Expense: {parseDate(result.date_of_invoice)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="#02314D" />
                </ListItem>
              );
            }
          })}
        </ScrollView>
        <Text style={styles.boldLargeText}>
          {/* Display the invoiceAmount in a Text component */}
          Monthly Total: £{parseFloat(this.state.invoiceAmount).toFixed(2)}
        </Text>
      </View>
    );
  }
}
