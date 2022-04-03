import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, parseDate, convertToTimestamp, missingDataAlert, invalidTimeAlert, isValidTime, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class UpdateAccidentReport extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      childName: "",
      accidentDate: "",
      accidentTime: "",
      accidentLocation: "",
      accidentDetail: "",
      accidentAction: "",
      accidentMedicalAttention: "",
      accidentNotes: "",
      date: new Date(),
      show: false,
      childNames: [],
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      accidentDate: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads mileage data from the database into the page
  componentDidMount() {
    const childNames = [];
    let index = 0;
    
    // Query the database to gather names of all children and store these names in childNames array
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

    // Query the database to gather accident report data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("accidentReports")
      .doc(this.props.route.params.userkey);
    
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          childName: data.child_name,
          accidentDate: parseDate(data.accident_date),
          accidentTime: data.accident_time,
          accidentNotes: data.accident_notes,
          accidentLocation: data.accident_location,
          accidentDetail: data.accident_detail,
          accidentAction: data.accident_action,
          accidentMedicalAttention: data.accident_medical_attention
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  // Set the state variable value to the value supplied from the input
  updateStateValue = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  editAccidentReport() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.accidentTime) || isInputEmpty(this.state.accidentLocation) || isInputEmpty(this.state.accidentDetail) || isInputEmpty(this.state.accidentAction) || isInputEmpty(this.state.accidentMedicalAttention)) {
      missingDataAlert();
      return;
    } else if (!isValidTime(this.state.accidentTime)) {
      invalidTimeAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app
        .firestore()
        .collection("accidentReports")
        .doc(this.state.key);
      documentUpdate
        .set({
          child_name: this.state.childName,
          accident_date: convertToTimestamp(this.state.accidentDate),
          accident_time: this.state.accidentTime,
          accident_notes: this.state.accidentNotes,
          accident_location: this.state.accidentLocation,
          accident_detail: this.state.accidentDetail,
          accident_action: this.state.accidentAction,
          accident_medical_attention: this.state.accidentMedicalAttention,
        })
        // Navigate the user back to the ViewAccidentReports page
        .then(() => {
          this.props.navigation.navigate("ViewAccidentReports");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the accident report log from the database, using userkey as an identifier & navigate the user back to the ViewAccidentReports page 
  deleteAccidentReport() {
    const documentReference = app
      .firestore()
      .collection("accidentReports")
      .doc(this.props.route.params.userkey);

    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewAccidentReports");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteAccidentReport() },
        {
          text: "No",
          onPress: () => console.log("Item not deleted"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    return (
      <ScrollView>
        <Text style={styles.bold}>Child Name:</Text>
        <View>
          {/* ModalSelector populated with children names from childNameArr */}
          <ModalSelector
            style={styles.dropdown}
            data={this.state.childNames}
            onChange={(option) => {
              this.setState({ childName: option.label });
            }}
          >
          <Text style={styles.dropdownText}>Select Child: {this.state.childName}</Text>
          </ModalSelector>
        </View>
        <Text style={styles.bold}>Date of Accident:</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showDatepicker()}
          >
            {this.state.show && (
              <DateTimePicker
                maximumDate={new Date()}
                value={this.state.date}
                mode="date"
                onChange={this.onDateChange}
              />
            )}
            <Text style={styles.buttonText}>
              Choose a Date: {this.state.accidentDate}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Accident Time:</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.accidentTime}
          onChangeText={(value) => this.updateStateValue(value, "accidentTime")}
        />
        <Text style={styles.bold}>Accident Location:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Location"}
          value={this.state.accidentLocation}
          onChangeText={(value) => this.updateStateValue(value, "accidentLocation")}
        />
        <Text style={styles.bold}>Accident Details:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Detail"}
          value={this.state.accidentDetail}
          onChangeText={(value) => this.updateStateValue(value, "accidentDetail")}
        />
        <Text style={styles.bold}>Actions Taken:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Action"}
          value={this.state.accidentAction}
          onChangeText={(value) => this.updateStateValue(value, "accidentAction")}
        />
        <Text style={styles.bold}>Medication Administered:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Medical Attention"}
          value={this.state.accidentMedicalAttention}
          onChangeText={(value) => this.updateStateValue(value, "accidentMedicalAttention")}
        />
        <Text style={styles.bold}>Accident Notes:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert any additional information"}
          value={this.state.accidentNotes}
          onChangeText={(value) => this.updateStateValue(value, "accidentNotes")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => this.editAccidentReport()}>
          <Text style={styles.buttonTextMenu}>Update</Text>
        </Button>
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#EE752E"
          onPress={this.alertDialog}>
          <Text style={styles.buttonTextMenu}>Delete</Text>
        </Button>
        <View style={styles.submitButtonSpace}></View>
      </ScrollView>
    );
  }
}
