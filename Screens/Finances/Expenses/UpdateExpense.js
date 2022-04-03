import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateExpense extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      dateOfExpense: "",
      expenseAmount: "",
      expenseNote: "",
      expenseTitle: "",
      receiptUrl: "",
      category: "",
      date: new Date(),
      show: false,
    };
  }

  // When date value is changed via date picker, set the new value here
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfExpense: convertDate(currentDate),
      show: false,
    });
  };

  // Display the date picker
  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  // This runs after the render function and loads expense data from the database into the page
  componentDidMount() {
    // Query the database to gather expense log data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dateOfExpense: parseDate(data.date_of_expense),
          expenseAmount: data.expense_amount,
          expenseNote: data.expense_note,
          expenseTitle: data.expense_title,
          receiptUrl: data.receipt_url,
          category: data.expense_category,
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

  editExpenseLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(this.state.expenseTitle) || isInputEmpty(this.state.expenseAmount) || this.state.category == undefined) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.expenseAmount) || !isNumeric(milesTravelled)){
      numericDataAlert();
    // If inputs are valid, update variable values to the database
    } else {
      const documentUpdate = app
        .firestore()
        .collection("expenseLogs")
        .doc(this.state.key);

      documentUpdate
        .set({
          date_of_expense: convertToTimestamp(this.state.dateOfExpense),
          expense_amount: this.state.expenseAmount,
          expense_note: this.state.expenseNote,
          expense_title: this.state.expenseTitle,
          receipt_url: this.state.receiptUrl,
          expense_category: this.state.category,
        })
        // Navigate the user back to the ViewExpenses page
        .then(() => {
          this.props.navigation.navigate("ViewExpenses");
        })
        // If an error occurs during this process, print an error
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Delete the expense log from the database, using userkey as an identifier & navigate the user back to the ViewExpenses page 
  deleteExpenseLog() {
    const documentReference = app
      .firestore()
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
      
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewExpenses");
    });
  }

  // Display alert to confirm if the user wants to delete the item from the database
  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteExpenseLog() },
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
    // Values to be used when populating ModalSelector for expense category
    let index = 0;
    const data = [
      { key: index++, section: true, label: "Categories" },
      { key: index++, label: "Fuel" },
      { key: index++, label: "Food" },
      { key: index++, label: "Stationary" },
      { key: index++, label: "Fees" },
      { key: index++, label: "Gifts" },
      { key: index++, label: "Toys" },
      { key: index++, label: "Miscellaneous" },
    ];

    let receiptButton;
    // If a receipt has been attached to the expense, display a 'View Receipt Button'
    if (this.state.receiptUrl !== "") {
      receiptButton = (
        <Button 
          mode="contained"
          uppercase={false}
          color="#02314D"
          onPress={() =>
            // Navigate the user to the 'ReceiptPreview' page and pass the receiptUrl
            this.props.navigation.navigate("ReceiptPreview", {
              receiptImage: this.state.receiptUrl,
            })
          }>
          <Text style={styles.buttonTextMenu}>View Receipt</Text>
        </Button>
      );
    }
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Expense Title</Text>
        <TextInput
          style={styles.input}
          placeholder={"Expense Title"}
          value={this.state.expenseTitle}
          onChangeText={(value) => this.updateStateValue(value, "expenseTitle")}
        />
        <Text style={styles.bold}>Expense Category</Text>
        <ModalSelector
          style={styles.dropdown}
          data={data}
          onChange={(option) => {
            this.updateStateValue(option.label, "category");
          }}
        >
          <Text style={styles.dropdownText}>
            Category: {this.state.category}
          </Text>
        </ModalSelector>
        <Text style={styles.bold}>Date of Expense</Text>
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
              Choose a Date: {this.state.dateOfExpense}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Expense Amount</Text>
        <TextInput
          style={styles.input}
          placeholder={"0.00"}
          value={this.state.expenseAmount}
          onChangeText={(value) => this.updateStateValue(value, "expenseAmount")}
        />
        <Text style={styles.bold}>Additional Notes</Text>
        <TextInput
          style={styles.input}
          placeholder={"Insert any additional information"}
          value={this.state.expenseNote}
          onChangeText={(value) => this.updateStateValue(value, "expenseNote")}
        />
        <View style={styles.space}></View>
        {receiptButton}
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => this.editExpenseLog()}>
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
