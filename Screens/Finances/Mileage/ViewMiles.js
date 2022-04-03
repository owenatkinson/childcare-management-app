import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, FlatList, Text } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import MonthPick from "../../../Components/MonthPick";
import { parseDate, getMonth, getYear, doNumbersMatch, convertDateCheckType } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class ViewMiles extends Component {
  constructor() {
    super();
    // Query the database to gather all mileage data and store in a variable
    this.docs = app
      .firestore()
      .collection("mileageLogs")
      .orderBy("date_of_mileage", "desc");
    // Initialising the state value of variables
    this.state = {
      mileageLogs: [],
      date: new Date(),
      mileageAmount: 0,
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Query the database to gather mileage data, store this in the mileageLogs array and set the state value
  fetchCollection = (querySnapshot) => {
    this.state.mileageAmount = 0;
    const mileageLogs = [];
    querySnapshot.forEach((result) => {
      const { mileage_amount, date_of_mileage } = result.data();
      mileageLogs.push({
        key: result.id,
        mileage_amount,
        date_of_mileage,
      });
    });
    this.setState({
      mileageLogs,
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
                  this.state.mileageAmount = 0;
                }}
              />
            }
          />
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
          {/* For each mileage log in mileageLogs */}
          {this.state.mileageLogs.map((result, id) => {
            // Only display mileage logs that match the year and month values of the MonthPick component
            if (
              doNumbersMatch(
                getMonth(convertDateCheckType(this.state.date)),
                getMonth(convertDateCheckType(result.date_of_mileage))
              ) &&
              doNumbersMatch(
                getYear(convertDateCheckType(this.state.date)),
                getYear(convertDateCheckType(result.date_of_mileage))
              )
            ) {
              // Increment the mileageAmount by accumulatively adding the mileage_amount of each expense
              this.state.mileageAmount += parseFloat(result.mileage_amount);
              return (
                <ListItem
                  key={id}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateMiles", {
                      userkey: result.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.navyBoldText}>£{result.mileage_amount}</ListItem.Title>
                    <ListItem.Subtitle style={styles.navyStandardText}>
                      Date: {parseDate(result.date_of_mileage)}
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
          Monthly Total: £{parseFloat(this.state.mileageAmount).toFixed(2)}
        </Text>
      </View>
    );
  }
}
