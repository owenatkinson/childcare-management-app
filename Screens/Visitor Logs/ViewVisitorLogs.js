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
    this.docs = app.firestore().collection("visitorLogs").orderBy("date_of_visit", "desc");
    this.state = {
      isLoading: true,
      visitorLogs: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
                onChange={(newDate) => this.setState({ date: newDate })}
              />
            }
          />
        </SafeAreaView>
        <ScrollView>
          {this.state.visitorLogs.map((result, id) => {
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
                    this.props.navigation.navigate("UpdateVisitorLog", {
                      userkey: result.key,
                    });
                  }}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>{result.visitor_name}</ListItem.Title>
                    <ListItem.Subtitle>
                      Date: {convertDateCheckType(result.date_of_visit)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
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
