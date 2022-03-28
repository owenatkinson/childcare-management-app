import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { getMonday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class MonthlyFireSafetyEquipmentList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("monthlyFireSafetyEquipmentCheck");
    this.state = {
      isLoading: true,
      monthlyFireSafetyEquipmentCheck: [],
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
    const monthlyFireSafetyEquipmentCheck = [];
    querySnapshot.forEach((result) => {
      const { monthly_fire_safety_date, monthly_fire_safety_is_completed } = result.data();
      monthlyFireSafetyEquipmentCheck.push({
        key: result.id,
        monthly_fire_safety_date,
        monthly_fire_safety_is_completed,
      });
    });
    this.setState({
      monthlyFireSafetyEquipmentCheck,
      isLoading: false,
    });
  };

  render() {
    if (
      this.state.monthlyFireSafetyEquipmentCheck === undefined ||
      isInputEmpty(this.state.monthlyFireSafetyEquipmentCheck)
    ) {
      return <View></View>;
    } else {
      const newArray = this.state.monthlyFireSafetyEquipmentCheck.filter(
        (x) => x.monthly_fire_safety_date == this.props.changeDate
      );

      if (newArray.length == 1) {
        return (
          <ScrollView>
            {this.state.monthlyFireSafetyEquipmentCheck.map((result, id) => {
              if (
                getMonday(this.props.changeDate) &&
                result.monthly_fire_safety_date == this.props.changeDate
              ) {
                return (
                  <ListItem
                    key={id}
                    onPress={() => {
                      this.props.navigation.navigate("MonthlyFireSafetyEquipmentCheck", {
                        userkey: result.key,
                      });
                    }}
                    bottomDivider
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.navyBoldText}>Monthly Fire Safety Equipment Check</ListItem.Title>
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
              this.props.navigation.navigate("AddMonthlyFireSafetyEquipmentList", {
                changeDate: this.props.changeDate,
              });
            }}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.navyBoldText}>Monthly Fire Safety Equipment Check</ListItem.Title>
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
