import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { parseDate } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewAccidentReports extends Component {
  constructor() {
    super();
    // Query the database to gather all accident report data and store in a variable
    this.docs = app
      .firestore()
      .collection("accidentReports")
      .orderBy("accident_date", "desc");
    // Initialising the state value of variables
    this.state = {
      accidentReports: [],
      childNames: [],
      activeChildName: "",
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
    const childNames = [], accidentReports = [];
    let index = 0;

    // Query the database to gather names of all children, store these names in childNames array and set the state value
    app
      .firestore()
      .collection("children")
      .orderBy("child_name", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          childNames.push({
            key: index++,
            label: document.data()["child_name"],
          });
        });
        this.setState({
          childNames: childNames,
        });
      });

    // Gather accident report data, store it to the accidentReports array and set the state value
    querySnapshot.forEach((result) => {
      const { child_name, accident_date, accident_time, accident_notes } = result.data();
      accidentReports.push({
        key: result.id,
        child_name,
        accident_date,
        accident_time,
        accident_notes,
      });
    });
    this.setState({
      accidentReports: accidentReports,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View>
          {/* ModalSelector populated with children names from childNames */}
          <ModalSelector
            data={this.state.childNames}
            initValue="Select Child"
            style={styles.navyText}
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {/* For each item in accidentReports */}
        {this.state.accidentReports.map((report, id) => {
          // If the child name within the report matches the child name in the modal selector, display it
          if (report.child_name == this.state.activeChildName) {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  // Navigate to UpdateAccidentReport and pass userkey variable
                  this.props.navigation.navigate("UpdateAccidentReport", {
                    userkey: report.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.navyBoldText}>{report.child_name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.navyStandardText}>
                    Date: {parseDate(report.accident_date)}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#02314D" />
              </ListItem>
            );
          } else {
            null;
          }
        })}
      </ScrollView>
    );
  }
}
