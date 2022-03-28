import React, { Component } from "react";
import { View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default class UpdateExpense extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      dateOfExpense: convertDate(currentDate),
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
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
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

  editExpenseLog() {
    if (isInputEmpty(this.state.expenseTitle) || isInputEmpty(this.state.expenseAmount) || this.state.category == undefined) {
      missingDataAlert();
      return;
    } else if (!isNumeric(this.state.expenseAmount) || !isNumeric(milesTravelled)){
      numericDataAlert();
    } else {
      this.setState({
        isLoading: true,
      });
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
        .then(() => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate("ViewExpenses");
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  deleteExpenseLog() {
    const documentReference = app
      .firestore()
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
    documentReference.delete().then(() => {
      this.props.navigation.navigate("ViewExpenses");
    });
  }

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

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    uploadImage(result.uri);
  };

  render() {
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
    if (this.state.receiptUrl !== "") {
      receiptButton = (
        <Button 
          mode="contained"
          uppercase={false}
          color="#02314D"
          onPress={() =>
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
          onChangeText={(value) => this.inputEl(value, "expenseTitle")}
        />
        <Text style={styles.bold}>Expense Category</Text>
        <ModalSelector
          style={styles.dropdown}
          data={data}
          onChange={(option) => {
            this.inputEl(option.label, "category");
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
                onChange={this.onChange}
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
          onChangeText={(value) => this.inputEl(value, "expenseAmount")}
        />
        <Text style={styles.bold}>Additional Notes</Text>
        <TextInput
          style={styles.input}
          placeholder={"Insert any additional information"}
          value={this.state.expenseNote}
          onChangeText={(value) => this.inputEl(value, "expenseNote")}
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
