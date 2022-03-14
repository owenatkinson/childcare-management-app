import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, FlatList, Text } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import MonthPick from "../../../Components/MonthPick";
import {
  parseDate,
  getMonth,
  getYear,
  doNumbersMatch,
  convertDateCheckType,
} from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class ViewExpenses extends Component {
  constructor() {
    super();
    this.docs = app
      .firestore()
      .collection("expenseLogs")
      .orderBy("date_of_expense", "desc");
    this.state = {
      isLoading: true,
      expenseLogs: [],
      date: new Date(),
      expenseTotal: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    this.state.expenseTotal = 0;
    const expenseLogs = [];
    querySnapshot.forEach((res) => {
      const { expense_title, expense_note, expense_amount, date_of_expense } =
        res.data();
      expenseLogs.push({
        key: res.id,
        expense_title,
        expense_note,
        expense_amount,
        date_of_expense,
      });
    });
    this.setState({
      expenseLogs,
      isLoading: false,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
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
          {this.state.expenseLogs.map((res, i) => {
            if (
              doNumbersMatch(
                getMonth(convertDateCheckType(this.state.date)),
                getMonth(convertDateCheckType(res.date_of_expense))
              ) &&
              doNumbersMatch(
                getYear(convertDateCheckType(this.state.date)),
                getYear(convertDateCheckType(res.date_of_expense))
              )
            ) {
              this.state.expenseTotal += parseFloat(res.expense_amount);
              return (
                <ListItem
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateExpense", {
                      userkey: res.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>{res.expense_title}</ListItem.Title>
                    <ListItem.Subtitle>
                      Date: {parseDate(res.date_of_expense)}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      Amount: £{res.expense_amount}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
                </ListItem>
              );
            }
          })}
        </ScrollView>
        <Text style={styles.boldLargeText}>
          Month Total: £{parseFloat(this.state.expenseTotal).toFixed(2)}
        </Text>
      </View>
    );
  }
}
