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
    this.docs = app
      .firestore()
      .collection("mileageLogs")
      .orderBy("date_of_mileage", "desc");
    this.state = {
      isLoading: true,
      mileageLogs: [],
      date: new Date(),
      mileageAmount: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
                  this.state.mileageAmount = 0;
                }}
              />
            }
          />
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
          {this.state.mileageLogs.map((result, id) => {
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
                    <ListItem.Title>£{result.mileage_amount}</ListItem.Title>
                    <ListItem.Subtitle>
                      Date: {parseDate(result.date_of_mileage)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
                </ListItem>
              );
            }
          })}
        </ScrollView>
        <Text style={styles.boldLargeText}>
          Monthly Total: £{parseFloat(this.state.mileageAmount).toFixed(2)}
        </Text>
      </View>
    );
  }
}
