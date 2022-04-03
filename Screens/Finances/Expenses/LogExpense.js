import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

// navigation parameter to navigate the user to a new page
const LogExpense = ({ navigation }) => {
  // Initialising the state value of variables
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [receiptURL, setReceiptURL] = useState("");
  const dateOfExpense = useInput(new Date());
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  // Initialising connection to expenseLogs database table
  const fireDB = app.firestore().collection("expenseLogs");

  async function addExpenseLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(expenseTitle) || isInputEmpty(expenseAmount) || category == undefined) {
      missingDataAlert();
      return;
    } else if (!isNumeric(expenseAmount)){
      numericDataAlert();
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        expense_title: expenseTitle,
        expense_note: expenseNote,
        expense_amount: expenseAmount,
        date_of_expense: dateOfExpense.date,
        receipt_url: receiptURL,
        expense_category: category,
      });
      // Navigate the user back to the Finances page
      navigation.navigate("Finances");
    }
  }

  useEffect(() => {
    // Seek permission to access the user's camera to enable bar code scanning
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    // If the image picker isn't cancelled, set the image variable to equal the uri of the selected image
    if (!result.cancelled) {
      setImage(result.uri);
    }

    uploadImage(result.uri);
  };

  async function uploadImage(file) {
    // Use a blob to store XML information regarding image being uploaded
    const blob = await new Promise((resolve, reject) => {
      const xml = new XMLHttpRequest();
      xml.onload = function () {
        resolve(xml.response);
      };
      xml.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xml.responseType = "blob";
      xml.open("GET", file, true);
      xml.send(null);
    });

    // Trim the filename into an appropriate format to be stored on firebase storage
    let trimFileName = /[^/]*$/.exec(file)[0];
    // Provide firebase storage location to store the receipt
    const ref = app.storage().ref(`/receipts/${trimFileName}`);
    const snapshot = ref.put(blob);

    snapshot.on(
      "state_changed",
      // Next callback can be blank here
      function () {
      },
      // Error callback used to capture error
      function (error) {
        console.log(error);
        blob.close();
        return;
      },
      // Complete callback used set the ReceiptURL variable value
      function () {
        snapshot.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setReceiptURL(downloadURL);
        });
        blob.close();
        return;
      }
    );
  }

  // Values to be used when populating ModalSelector for expense category
  let index = 0;
  const selectorData = [
    { key: index++, section: true, label: "Categories" },
    { key: index++, label: "Fuel" },
    { key: index++, label: "Food" },
    { key: index++, label: "Stationary" },
    { key: index++, label: "Fees" },
    { key: index++, label: "Gifts" },
    { key: index++, label: "Toys" },
    { key: index++, label: "Miscellaneous" },
  ];

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Expense Title</Text>
      <TextInput
        style={styles.input}
        placeholder={"Expense Title"}
        label={"Expense Title"}
        value={expenseTitle}
        onChangeText={setExpenseTitle}
      />
      <Text style={styles.bold}>Expense Category</Text>
      <View>
        <ModalSelector
          style={styles.dropdown}
          data={selectorData}
          onChange={(option) => {
            setCategory(option.label);
          }}
        >
        <Text style={styles.dropdownText}>Category: {category}</Text>
        </ModalSelector>
      </View>
      <Text style={styles.bold}>Date of Expense</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={dateOfExpense.showDatepicker}
        >
          {dateOfExpense.show && (
            <DateTimePicker
              // The latest date value that the user can use is today's date
              maximumDate={new Date()}
              value={dateOfExpense.date}
              mode={dateOfExpense.mode}
              is24Hour={true}
              onChange={dateOfExpense.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Date: {convertDate(dateOfExpense.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Expense Amount (£)</Text>
      <TextInput
        style={styles.input}
        placeholder={"0.00"}
        label={"Expense Amount"}
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput
        multiline={true}
        placeholder={"Insert any additional information"}
        numberOfLines={4}
        style={styles.extendedInput}
        label={"Additional Notes"}
        value={expenseNote}
        onChangeText={setExpenseNote}
      />
      <View>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload a Receipt</Text>
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={styles.receiptPreview} />}
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addExpenseLog()}>
        <Text style={styles.buttonTextMenu}>Log Expense</Text>
      </Button>
      <View style={styles.submitButtonSpace}></View>
    </ScrollView>
  );
};

// used to generate functionality for dateOfExpense
function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

export default LogExpense;
