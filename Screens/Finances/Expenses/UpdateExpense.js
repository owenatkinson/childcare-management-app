import React, { Component } from "react";
import { Button, View, ScrollView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parseDate, convertDate, convertToTimestamp, missingDataAlert, isNumeric } from "../../../Components/Functionality";
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
    const docRef = app
      .firestore()
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          dateOfExpense: parseDate(user.date_of_expense),
          expenseAmount: user.expense_amount,
          expenseNote: user.expense_note,
          expenseTitle: user.expense_title,
          receiptUrl: user.receipt_url,
          category: user.expense_category,
          isLoading: false,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  editExpenseLog() {
    if (this.state.expenseTitle == 0 || this.state.category == undefined || this.state.expenseAmount.length == 0 || !isNumeric(this.state.expenseAmount) ) {
      missingDataAlert();
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      const docUpdate = app
        .firestore()
        .collection("expenseLogs")
        .doc(this.state.key);
      docUpdate
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
            key: "",
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
    const docRef = app
      .firestore()
      .collection("expenseLogs")
      .doc(this.props.route.params.userkey);
    docRef.delete().then((res) => {
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
          title="View Receipt"
          onPress={() =>
            this.props.navigation.navigate("ReceiptPreview", {
              receiptImage: this.state.receiptUrl,
            })
          }
          color="#000000"
        />
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
          onChangeText={(val) => this.inputEl(val, "expenseTitle")}
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
          onChangeText={(val) => this.inputEl(val, "expenseAmount")}
        />
        <Text style={styles.bold}>Additional Notes</Text>
        <TextInput
          style={styles.input}
          placeholder={"Insert any additional information"}
          value={this.state.expenseNote}
          onChangeText={(val) => this.inputEl(val, "expenseNote")}
        />
        <View style={styles.space}></View>
        {receiptButton}
        <View style={styles.space}></View>
        <Button
          style={styles.buttonText}
          title="Update"
          onPress={() => this.editExpenseLog()}
          color="#0B8FDC"
        />
        <View style={styles.space}></View>
        <Button title="Delete" onPress={this.alertDialog} color="#EE752E" />
      </ScrollView>
    );
  }
}
