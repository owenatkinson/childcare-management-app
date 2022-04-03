import React, { useState } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, missingDataAlert, isNumeric, numericDataAlert, isInputEmpty } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

// navigation parameter to navigate the user to a new page
const LogMiles = ({ navigation }) => {
  // Initialising the state value of variables
  const [mileageAmount, setMileageAmount] = useState(0);
  const [mileageRate, setMileageRate] = useState("");
  const [milesTravelled, setMilesTravelled] = useState("");
  const dateOfMileage = useInput(new Date());
  // Initialising connection to mileageLogs database table
  const fireDB = app.firestore().collection("mileageLogs");

  async function addMileageLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(mileageRate) || isInputEmpty(milesTravelled)) {
      missingDataAlert();
      return;
    } else if (!isNumeric(mileageRate) || !isNumeric(milesTravelled)){
      numericDataAlert();
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        mileage_amount: mileageAmount,
        mileage_rate: mileageRate,
        miles_travelled: milesTravelled,
        date_of_mileage: dateOfMileage.date,
      });
      // Navigate the user back to the Finances page
      navigation.navigate("Finances");
    }
  }

  // Display alert to confirm if the user wants to log mileage data to the database
  const alertDialog = () => {
    Alert.alert(
      "Log Mileage",
      "Confirm",
      [
        { text: "Log", onPress: () => addMileageLog() }
      ],
      {
        cancelable: true,
      }
    );
  };

  // calculates the mileage amount based on the milesTravelled and mileageRate variables
  function calculateMileageAmount(){
    setMileageAmount(
      parseFloat(milesTravelled * parseFloat(mileageRate)).toFixed(2)
    );
  }

  // calculates the mileage amount and displays alert dialog
  function calculateAndAlert(){
    calculateMileageAmount();
    alertDialog();
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Miles Travelled</Text>
      <TextInput
        style={styles.input}
        placeholder={"Miles Travelled"}
        value={milesTravelled}
        onChangeText={setMilesTravelled}
      />
      <Text style={styles.bold}>Rate (pence per mile)</Text>
      <TextInput
        style={styles.input}
        placeholder={"0.00"}
        value={mileageRate}
        onChangeText={setMileageRate}
      />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            calculateMileageAmount();
          }}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Mileage Amount: £{mileageAmount}</Text>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Date of Mileage Expense:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={dateOfMileage.showDatepicker}
        >
          {dateOfMileage.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={dateOfMileage.date}
              mode={dateOfMileage.mode}
              is24Hour={true}
              onChange={dateOfMileage.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Date: {convertDate(dateOfMileage.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => calculateAndAlert()}>
        <Text style={styles.buttonTextMenu}>Log Mileage</Text>
      </Button>
    </ScrollView>
  );
};

// used to generate functionality for dateOfMileage
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

export default LogMiles;
