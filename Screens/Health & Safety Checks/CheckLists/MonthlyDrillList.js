import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { getMonday } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class MonthlyDrillList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("monthlyFireDrill");
    this.state = {
      isLoading: true,
      monthlyFireDrill: [],
      changeDate: "",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const monthlyFireDrill = [];
    querySnapshot.forEach((result) => {
      const { monthly_fire_drill_date, monthly_fire_drill_is_completed } = result.data();
      monthlyFireDrill.push({
        key: result.id,
        monthly_fire_drill_date,
        monthly_fire_drill_is_completed,
      });
    });
    this.setState({
      monthlyFireDrill,
      isLoading: false,
    });
  };

  render() {
    if (this.state.monthlyFireDrill === undefined || this.state.monthlyFireDrill.length == 0) {
      return <View></View>;
    } else {
      const newArray = this.state.monthlyFireDrill.filter(
        (x) => x.monthly_fire_drill_date == this.props.changeDate
      );
      if (newArray.length == 1) {
        return (
          <ScrollView>
            {this.state.monthlyFireDrill.map((result, id) => {
              if (result.monthly_fire_drill_date == this.props.changeDate) {
                return (
                  <ListItem
                    key={id}
                    onPress={() => {
                      this.props.navigation.navigate("MonthlyFireDrill", {
                        userkey: result.key,
                      });
                    }}
                    bottomDivider
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.navyBoldText}>Monthly Fire Drill</ListItem.Title>
                      <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: Yes</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#02314D" />
                  </ListItem>
                );
              }
            })}
          </ScrollView>
        );
      } else if (getMonday(this.props.changeDate)) {
        return (
          <ListItem
            onPress={() => {
              this.props.navigation.navigate("AddMonthlyDrillList", {
                changeDate: this.props.changeDate,
              });
            }}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.navyBoldText}>Monthly Fire Drill</ListItem.Title>
              <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: No</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="#02314D" />
          </ListItem>
        );
      } else {
        return <View></View>;
      }
    }
  }
}
