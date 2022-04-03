import React, { Component } from "react";
import { FlatList, ScrollView, View, SafeAreaView } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import MonthPick from "../../Components/MonthPick";
import { getMonth, getYear, doNumbersMatch, convertDateCheckType } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewVisitorLogs extends Component {
  constructor() {
    super();
    // Query the database to gather all vistor log data and store in a variable
    this.docs = app
      .firestore()
      .collection("visitorLogs")
      .orderBy("date_of_visit", "desc");
    // Initialising the state value of variables
    this.state = {
      visitorLogs: [],
      date: new Date(),
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Query the database to gather vistor log data, store this in the visitorLogs array and set the state value
  fetchCollection = (querySnapshot) => {
    const visitorLogs = [];
    querySnapshot.forEach((result) => {
      const { visitor_name, date_of_visit, time_in, time_out, visit_purpose } = result.data();
      visitorLogs.push({
        key: result.id,
        visitor_name,
        date_of_visit,
        time_in,
        time_out,
        visit_purpose,
      });
    });
    this.setState({
      visitorLogs,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        {/* MonthPick used to filter visitor logs into a month & year */}
        <SafeAreaView edges={["bottom", "left", "right"]}>
          <FlatList
            ListHeaderComponent={
              <MonthPick
                style={styles.navyStandardText}
                date={this.state.date}
                onChange={(newDate) => this.setState({ date: newDate })}
              />
            }
          />
        </SafeAreaView>
        <ScrollView>
          {/* For each visitor log in visitorLogs */}
          {this.state.visitorLogs.map((result, id) => {
            // Only display vistor logs that match the year and month values of the MonthPick component
            if (
              doNumbersMatch(
                getMonth(convertDateCheckType(this.state.date)),
                getMonth(convertDateCheckType(result.date_of_visit))
              ) &&
              doNumbersMatch(
                getYear(convertDateCheckType(this.state.date)),
                getYear(convertDateCheckType(result.date_of_visit))
              )
            ) {
              return (
                <ListItem
                  key={id}
                  onPress={() => {
                    // Navigate to the UpdateVisitorLog page and populate fields data using the userkey variable as an identifier
                    this.props.navigation.navigate("UpdateVisitorLog", {
                      userkey: result.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.navyBoldText}>{result.visitor_name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.navyStandardText}>
                      Date: {convertDateCheckType(result.date_of_visit)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="#02314D" />
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </ScrollView>
      </View>
    );
  }
}
