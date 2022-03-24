import React, { Component } from "react";
import { ScrollView } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
const styles = require("../../Styles/general");

export default class ListLogs extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("attendanceRegister").orderBy("child_name", "desc");
    this.state = {
      isLoading: true,
      attendanceLogs: [],
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
    const attendanceLogs = [];
    querySnapshot.forEach((result) => {
      const { child_name, date_of_attendance, check_in_time, check_out_time } = result.data();
      attendanceLogs.push({
        key: result.id,
        child_name,
        date_of_attendance,
        check_in_time,
        check_out_time,
      });
    });
    this.setState({
      attendanceLogs,
      isLoading: false,
    });
  };

  render() {
    return (
      <ScrollView>
        {this.state.attendanceLogs.map((result, id) => {
          if (result.date_of_attendance == this.props.changeDate) {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  this.props.navigation.navigate("ViewLogDetails", {
                    userkey: result.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.navyBoldText}>{result.child_name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.navyStandardText}>
                    {result.check_in_time}-{result.check_out_time}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#02314D" />
              </ListItem>
            );
          }
        })}
      </ScrollView>
    );
  }
}
