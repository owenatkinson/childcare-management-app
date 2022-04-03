import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { getMonday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class MonthlyDrillList extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.docs = app.firestore().collection("monthlyFireDrill");
    this.state = {
      monthlyFireDrill: [],
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
    const monthlyFireDrill = [];
    // Query the database to gather names of all monthly fire drills, store these names in monthlyFireDrill array and sets the state value
    querySnapshot.forEach((result) => {
      const { monthly_fire_drill_date } = result.data();
      monthlyFireDrill.push({
        key: result.id,
        monthly_fire_drill_date,
      });
    });
    this.setState({
      monthlyFireDrill,
    });
  };

  render() {
    // If no monthlyFireDrill exists, return a blank view
    if (this.state.monthlyFireDrill === undefined || isInputEmpty(this.state.monthlyFireDrill)) {
      return <View></View>;
    // Otherwise create a new array and filter monthlyFireDrill array to only include records which match the current date
    } else {
      const newArray = this.state.monthlyFireDrill.filter(
        (item) => item.monthly_fire_drill_date == this.props.changeDate
      );
      // If there is a monthly fire drill log present for the selected date
      if (newArray.length == 1) {
        // Display its info as a ListItem and set its status as completed
        return (
          <ScrollView>
            {/* For each monthly drill list */}
            {this.state.monthlyFireDrill.map((result, id) => {
              // If monthly fire drill has the selected date, display in ListItem
              if (result.monthly_fire_drill_date == this.props.changeDate) {
                return (
                  <ListItem
                    key={id}
                    onPress={() => {
                      // Navigate to the MonthlyFireDrill page and populate fields data using the userkey variable as an identifier
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
      // If no monthly fire drill is present for selected date, but the selected date is the first monday of the month
      } else if (getMonday(this.props.changeDate)) {
        // Display its info as a ListItem and set its status as incompleted
        return (
          <ListItem
            onPress={() => {
              // Navigate to the AddMonthlyDrillList page and pass the changeDate parameter with it
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
