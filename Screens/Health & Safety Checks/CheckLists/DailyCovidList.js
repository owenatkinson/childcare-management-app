import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { isWeekday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class DailyCovidList extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.docs = app.firestore().collection("dailyCovidAssessment");
    this.state = {
      dailyCovidAssessment: [],
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
    const dailyCovidAssessment = [];
    // Query the database to gather names of all daily covid assessments, store these names in dailyCovidAssessment array and sets the state value
    querySnapshot.forEach((result) => {
      const { daily_covid_assessment_date, daily_covid_assessment_is_completed } = result.data();
      dailyCovidAssessment.push({
        key: result.id,
        daily_covid_assessment_date,
        daily_covid_assessment_is_completed,
      });
    });
    this.setState({
      dailyCovidAssessment,
    });
  };

  render() {
    // If no dailyCovidAssessment exists, return a blank view
    if (
      this.state.dailyCovidAssessment === undefined ||
      isInputEmpty(this.state.dailyCovidAssessment) ||
      isWeekday(this.props.changeDate)
    ) {
      return <View></View>;
    // Otherwise create a new array and filter dailyCovidAssessment array to only include records which match the current date
    } else {
      const newArray = this.state.dailyCovidAssessment.filter(
        (item) => item.daily_covid_assessment_date == this.props.changeDate
      );
      // If there is a daily covid assessment log present for the selected date
      if (newArray.length == 1) {
        // Display its info as a ListItem and set its status as completed
        return (
          <ScrollView>
            {
              // for each daily covid check
              newArray.map((result, id) => {
                // if daily covid check has the selected date, display in row
                return (
                  <ListItem
                    key={id}
                    onPress={() => {
                      // Navigate to the DailyCovidAssessment page and populate fields data using the userkey variable as an identifier
                      this.props.navigation.navigate("DailyCovidAssessment", {
                        userkey: result.key,
                      });
                    }}
                    bottomDivider
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.navyBoldText}>Daily COVID Assessment</ListItem.Title>
                      <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: Yes</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#02314D" />
                  </ListItem>
                );
              })
            }
          </ScrollView>
        );
      // Otherwise, if there is a daily covid assessment log present for the selected date
      } else {
        // Display its info as a ListItem and set its status as incompleted
        return (
          <ListItem
            onPress={() => {
              // Navigate to the AddDailyCovidAssessment page and pass the changeDate parameter with it
              this.props.navigation.navigate("AddDailyCovidAssessment", {
                changeDate: this.props.changeDate,
              });
            }}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.navyBoldText}>Daily COVID Assessment</ListItem.Title>
              <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: No</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="#02314D" />
          </ListItem>
        );
      }
    }
  }
}
