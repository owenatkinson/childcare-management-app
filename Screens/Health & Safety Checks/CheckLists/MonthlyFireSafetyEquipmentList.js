import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { getMonday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class MonthlyFireSafetyEquipmentList extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.docs = app.firestore().collection("monthlyFireSafetyEquipmentCheck");
    this.state = {
      monthlyFireSafetyEquipmentCheck: [],
      changeDate: "",
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const monthlyFireSafetyEquipmentCheck = [];
    // Query the database to gather names of all monthly fire safety equipment checks, store these names in monthlyFireSafetyEquipmentCheck array and sets the state value
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
    });
  };

  render() {
    // If no monthlyFireSafetyEquipmentCheck exists, return a blank view
    if (
      this.state.monthlyFireSafetyEquipmentCheck === undefined ||
      isInputEmpty(this.state.monthlyFireSafetyEquipmentCheck)
    ) {
      return <View></View>;
    // Otherwise create a new array and filter monthlyFireSafetyEquipmentCheck array to only include records which match the current date
    } else {
      const newArray = this.state.monthlyFireSafetyEquipmentCheck.filter(
        (x) => x.monthly_fire_safety_date == this.props.changeDate
      );
      // If there is a monthly fire safety equipment check present for the selected date
      if (newArray.length == 1) {
        return (
          <ScrollView>
            {/* For each monthly drill list */}
            {this.state.monthlyFireSafetyEquipmentCheck.map((result, id) => {
              // If monthly fire safety equipment check has the selected date, display in ListItem
              if (getMonday(this.props.changeDate) && result.monthly_fire_safety_date == this.props.changeDate) {
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
      // If no monthly fire safety equipment check is present for selected date, but the selected date is the first monday of the month
      } else if (getMonday(this.props.changeDate)) {
        // Display its info as a ListItem and set its status as incompleted
        return (
          <ListItem
            onPress={() => {
              // Navigate to the AddMonthlyFireSafetyEquipmentList page and pass the changeDate parameter with it
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
