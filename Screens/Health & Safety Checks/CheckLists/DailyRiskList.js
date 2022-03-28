import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../../Components/firebase";
import { ListItem } from "react-native-elements";
import { isWeekday, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class DailyRiskList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("dailyRiskAssessment");
    this.state = {
      isLoading: true,
      dailyRiskAssessment: [],
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
    const dailyRiskAssessment = [];
    querySnapshot.forEach((result) => {
      const { daily_risk_assessment_date, daily_risk_assessment_is_completed } = result.data();
      dailyRiskAssessment.push({
        key: result.id,
        daily_risk_assessment_date,
        daily_risk_assessment_is_completed,
      });
    });
    this.setState({
      dailyRiskAssessment,
      isLoading: false,
    });
  };

  render() {
    if (
      this.state.dailyRiskAssessment === undefined ||
      isInputEmpty(this.state.dailyRiskAssessment) ||
      isWeekday(this.props.changeDate)
    ) {
      return <View></View>;
    } else {
      const newArray = this.state.dailyRiskAssessment.filter(
        (x) => x.daily_risk_assessment_date == this.props.changeDate
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
      } else {
        return (
          <ListItem
            onPress={() => {
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
