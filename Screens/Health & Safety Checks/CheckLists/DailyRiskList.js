import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { isWeekday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class DailyRiskList extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.docs = app.firestore().collection("dailyRiskAssessment");
    this.state = {
      dailyRiskAssessment: [],
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
    const dailyRiskAssessment = [];
    // Query the database to gather names of all daily risk assessments, store these names in dailyRiskAssessment array and sets the state value
    querySnapshot.forEach((result) => {
      const { daily_risk_assessment_date } = result.data();
      dailyRiskAssessment.push({
        key: result.id,
        daily_risk_assessment_date,
      });
    });
    this.setState({
      dailyRiskAssessment,
    });
  };

  render() {
    // If no dailyRiskAssessment exists, return a blank view
    if (
      this.state.dailyRiskAssessment === undefined ||
      isInputEmpty(this.state.dailyRiskAssessment) ||
      isWeekday(this.props.changeDate)
    ) {
      return <View></View>;
    // Otherwise create a new array and filter dailyRiskAssessment array to only include records which match the current date
    } else {
      const newArray = this.state.dailyRiskAssessment.filter(
        (item) => item.daily_risk_assessment_date == this.props.changeDate
      );
      // If there is a daily risk assessment log present for the selected date
      if (newArray.length == 1) {
        // Display its info as a ListItem and set its status as completed
        return (
          <ScrollView>
            {/* For each daily risk assessment */}
            {newArray.map((result, id) => {
                return (
                  <ListItem
                    key={id}
                    onPress={() => {
                      // Navigate to the DailyRiskAssessment page and populate fields data using the userkey variable as an identifier
                      this.props.navigation.navigate("DailyRiskAssessment", {
                        userkey: result.key,
                      });
                    }}
                    bottomDivider
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.navyBoldText}>Daily Risk Assessment</ListItem.Title>
                      <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: Yes</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#02314D" />
                  </ListItem>
                );
              })
            }
          </ScrollView>
        );
      // Otherwise, if there is a daily risk assessment log present for the selected date
      } else {
        // Display its info as a ListItem and set its status as incompleted
        return (
          <ListItem
            onPress={() => {
              // Navigate to the AddDailyRiskAssessment page and pass the changeDate parameter with it
              this.props.navigation.navigate("AddDailyRiskAssessment", {
                changeDate: this.props.changeDate,
              });
            }}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.navyBoldText}>Daily Risk Assessment</ListItem.Title>
              <ListItem.Subtitle style={styles.navyStandardText}>Is Completed: No</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="#02314D" />
          </ListItem>
        );
      }
    }
  }
}
