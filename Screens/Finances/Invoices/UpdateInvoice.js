import React, { Component } from "react";
import { Button, View, TouchableOpacity, ScrollView, TextInput, Alert, Text } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateInvoice extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      childName: "",
      dateOfInvoice: "",
      invoiceAmount: "",
      childNames: [],
      date: new Date(),
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfInvoice: convertDate(currentDate),
      show: false,
    });
  };

  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    const documentReference = app
      .firestore()
      .collection("invoiceLogs")
      .doc(this.props.route.params.userkey);
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

    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dateOfInvoice: parseDate(data.date_of_invoice),
          childName: data.child_name,
          invoiceAmount: data.invoice_amount,
          isLoading: false,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  editInvoiceLog() {
    if (this.state.invoiceAmount.length == 0 || !isNumeric(this.state.invoiceAmount) ) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
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
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ViewInvoice");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  deleteInvoiceLog() {
    const documentReference = app
      .firestore()
      .collection("invoiceLogs")
      .doc(this.props.route.params.userkey);
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewInvoice");
    });
  }

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
                onChange={this.onChange}
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
          onChangeText={(value) => this.inputEl(value, "invoiceAmount")}
        />
        <View style={styles.space}></View>
        <Button
          style={styles.buttonText}
          title="Update"
          onPress={() => this.editInvoiceLog()}
          color="#0B8FDC"
        />
        <View style={styles.space}></View>
        <Button title="Delete" onPress={this.alertDialog} color="#EE752E" />
      </ScrollView>
    );
  }
}
