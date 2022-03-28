import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { isWeekday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class DailyCovidList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("dailyCovidAssessment");
    this.state = {
      isLoading: true,
      dailyCovidAssessment: [],
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
    const dailyCovidAssessment = [];
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
      isLoading: false,
    });
  };

  render() {
    if (
      this.state.dailyCovidAssessment === undefined ||
      isInputEmpty(this.state.dailyCovidAssessment) ||
      isWeekday(this.props.changeDate)
    ) {
      return <View></View>;
    } else {
      const newArray = this.state.dailyCovidAssessment.filter(
        (x) => x.daily_covid_assessment_date == this.props.changeDate
      );

      if (newArray.length == 1) {
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
      } else {
        return (
          <ListItem
            onPress={() => {
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
