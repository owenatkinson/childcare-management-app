import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

// navigation parameter to navigate the user to a new page
const LogInvoice = ({ navigation }) => {
  // Initialising the state value of variables
  const [childName, setChildName] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const dateOfInvoice = useInput(new Date());
  const [childNameArr, setChildNameArr] = useState([]);
  // Initialising connection to invoiceLogs database table
  const fireDB = app.firestore().collection("invoiceLogs");

  // Query the database to gather names of children who are marked as actively in care and store these names in childNameArr array
  useEffect(() => {
    const childNames = [];
    let index = 0;

    app
      .firestore()
      .collection("children")
      .where("child_is_active", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          childNames.push({
            key: index++,
            label: document.data()["child_name"],
          });
        });
        setChildNameArr(childNames);
      });
  }, []);

  async function addInvoiceLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(invoiceAmount) || childName == undefined) {
      missingDataAlert();
      return;
    } else if (!isNumeric(invoiceAmount)){
      numericDataAlert();
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        child_name: childName,
        invoice_amount: invoiceAmount,
        date_of_invoice: dateOfInvoice.date,
      });
      // Navigate the user back to the Finances page
      navigation.navigate("Finances");
    }
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child Name</Text>
      <View>
        {/* ModalSelector populated with children names from childNameArr */}
        <ModalSelector
          style={styles.dropdown}
          data={childNameArr}
          onChange={(option) => {
            setChildName(option.label);
          }}
        >
          <Text style={styles.dropdownText}>Select Child: {childName}</Text>
        </ModalSelector>
      </View>
      <Text style={styles.bold}>Date of Invoice</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={dateOfInvoice.showDatepicker}
        >
          {dateOfInvoice.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={dateOfInvoice.date}
              mode={dateOfInvoice.mode}
              is24Hour={true}
              onChange={dateOfInvoice.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Date: {convertDate(dateOfInvoice.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Invoice Amount (£)</Text>
      <TextInput
        style={styles.input}
        placeholder={"0.00"}
        label={"Expense Amount"}
        value={invoiceAmount}
        onChangeText={setInvoiceAmount}
      />
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addInvoiceLog()}>
        <Text style={styles.buttonTextMenu}>Log Invoice</Text>
      </Button>
    </ScrollView>
  );
};

// used to generate functionality for dateOfInvoice
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

export default LogInvoice;
