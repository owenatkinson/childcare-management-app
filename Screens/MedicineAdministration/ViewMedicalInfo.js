import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { parseDate } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewMedicalInfo extends Component {
  constructor() {
    super();
    // Query the database to gather all medicine log data and store in a variable
    this.docs = app
      .firestore()
      .collection("medicineAdministration")
      .orderBy("medicine_date", "desc");
    // Initialising the state value of variables
    this.state = {
      medicineLogs: [],
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

  // Query the database to gather medicine data, store this in the visitorLogs array and set the state value
  fetchCollection = (querySnapshot) => {
    // Query the database to gather names of all children and store these names in childNames array
    const childNames = [];
    let index = 0;
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

    const medicineLogs = [];
    querySnapshot.forEach((result) => {
      const {
        child_name,
        medicine_title,
        medicine_date,
        medicine_time,
        medicine_reason,
        medicine_notes,
      } = result.data();
      medicineLogs.push({
        key: result.id,
        child_name,
        medicine_title,
        medicine_date,
        medicine_time,
        medicine_reason,
        medicine_notes,
      });
    });
    this.setState({
      medicineLogs,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View>
          {/* ModalSelector populated with children names from childNameArr */}
          <ModalSelector
            style={styles.navyText}
            data={this.state.childNames}
            initValue="Select Child"
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {/* For each item in medicineLogs */}
        {this.state.medicineLogs.map((result, id) => {
          // Display the medicine info regarding the child name selected the modal selector
          if (result.child_name == this.state.activeChildName) {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  // Navigate to the UpdateMedicineLog page and populate fields data using the userkey variable as an identifier
                  this.props.navigation.navigate("UpdateMedicineLog", {
                    userkey: result.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.navyBoldText}>{result.medicine_title}</ListItem.Title>
                  <ListItem.Subtitle style={styles.navyStandardText}>Date: {parseDate(result.medicine_date)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#02314D" />
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  }
}
