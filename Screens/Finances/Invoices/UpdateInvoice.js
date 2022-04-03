import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateInvoice extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      childName: "",
      dateOfInvoice: "",
      invoiceAmount: "",
      childNames: [],
      date: new Date(),
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfInvoice: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads invoice data from the database into the page
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

    // Query the database to gather invoice log data, using userkey as an identifier
    const documentReference = app
    .firestore()
    .collection("invoiceLogs")
    .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dateOfInvoice: parseDate(data.date_of_invoice),
          childName: data.child_name,
          invoiceAmount: data.invoice_amount,
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

  editInvoiceLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.invoiceAmount)) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.invoiceAmount)){
      numericDataAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app
        .firestore()
        .collection("invoiceLogs")
        .doc(this.state.key);

      documentUpdate
        .set({
          date_of_invoice: convertToTimestamp(this.state.dateOfInvoice),
          child_name: this.state.childName,
          invoice_amount: this.state.invoiceAmount,
        })
        // Navigate the user back to the ViewInvoice page
        .then(() => {
          this.props.navigation.navigate("ViewInvoice");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the invoice log from the database, using userkey as an identifier & navigate the user back to the ViewInvoice page 
  deleteInvoiceLog() {
    const documentReference = app
      .firestore()
      .collection("invoiceLogs")
      .doc(this.props.route.params.userkey);

    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewInvoice");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteInvoiceLog() },
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
        <Text style={styles.bold}>Child Name</Text>
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
        <Text style={styles.bold}>Date of Invoice</Text>
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
              Choose a Date: {this.state.dateOfInvoice}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Invoice Amount</Text>
        <TextInput
          style={styles.input}
          placeholder={"0.00"}
          value={this.state.invoiceAmount}
          onChangeText={(value) => this.updateStateValue(value, "invoiceAmount")}
        />
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => this.editInvoiceLog()}>
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
