import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, FlatList, Text } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import MonthPick from "../../../Components/MonthPick";
import { parseDate, getMonth, getYear, doNumbersMatch, convertDateCheckType } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class ViewExpenses extends Component {
  constructor() {
    super();
    // Query the database to gather all expense data and store in a variable
    this.docs = app
      .firestore()
      .collection("expenseLogs")
      .orderBy("date_of_expense", "desc");
    // Initialising the state value of variables
    this.state = {
      expenseLogs: [],
      date: new Date(),
      expenseTotal: 0,
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Query the database to gather expense data, store this in the expenseLogs array and set the state value
  fetchCollection = (querySnapshot) => {
    this.state.expenseTotal = 0;
    const expenseLogs = [];
    querySnapshot.forEach((result) => {
      const { expense_title, expense_note, expense_amount, date_of_expense } =
        result.data();
      expenseLogs.push({
        key: result.id,
        expense_title,
        expense_note,
        expense_amount,
        date_of_expense,
      });
    });
    this.setState({
      expenseLogs: expenseLogs,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        {/* MonthPick used to filter expense logs into a month & year */}
        <SafeAreaView edges={["bottom", "left", "right"]}>
          <FlatList
            ListHeaderComponent={
              <MonthPick
                date={this.state.date}
                onChange={(newDate) => {
                  this.setState({ date: newDate });
                  this.state.expenseTotal = 0;
                }}
              />
            }
          />
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
          {/* For each expense in expenseLogs */}
          {this.state.expenseLogs.map((result, id) => {
            // Only display expense logs that match the year and month values of the MonthPick component
            if (
              doNumbersMatch(
                getMonth(convertDateCheckType(this.state.date)),
                getMonth(convertDateCheckType(result.date_of_expense))
              ) &&
              doNumbersMatch(
                getYear(convertDateCheckType(this.state.date)),
                getYear(convertDateCheckType(result.date_of_expense))
              )
            ) {
              // Increment the expenseTotal by accumulatively adding the expense_amount of each expense
              this.state.expenseTotal += parseFloat(result.expense_amount);
              return (
                <ListItem
                  key={id}
                  onPress={() => {
                    // Navigate to the UpdateExpense page and populate fields data using the userkey variable as an identifier
                    this.props.navigation.navigate("UpdateExpense", {
                      userkey: result.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.navyBoldText}>{result.expense_title}</ListItem.Title>
                    <ListItem.Subtitle>
                      Date: {parseDate(result.date_of_expense)}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.navyStandardText}>
                      Amount: £{result.expense_amount}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="#02314D" />
                </ListItem>
              );
            }
          })}
        </ScrollView>
        <Text style={styles.boldLargeText}>
          {/* Display the expenseTotal in a Text component */}
          Monthly Total: £{parseFloat(this.state.expenseTotal).toFixed(2)}
        </Text>
      </View>
    );
  }
}
