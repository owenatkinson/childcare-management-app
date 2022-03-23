import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, missingDataAlert, isNumeric, numericDataAlert} from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

const LogMiles = ({ navigation }) => {
  const [mileageAmount, setMileageAmount] = useState(0);
  const [mileageRate, setMileageRate] = useState("");
  const [milesTravelled, setMilesTravelled] = useState("");
  const dateOfMileage = useInput(new Date());
  const fireDB = app.firestore().collection("mileageLogs");

  async function addMileageLog() {
    if (mileageRate.length == 0 || milesTravelled.length == 0) {
      missingDataAlert();
      return;
    } else if (!isNumeric(mileageRate) || !isNumeric(milesTravelled)){
      numericDataAlert();
    }
    else {
      await fireDB.add({
        mileage_amount: mileageAmount,
        mileage_rate: mileageRate,
        miles_travelled: milesTravelled,
        date_of_mileage: dateOfMileage.date,
      });
      navigation.navigate("Finances");
    }
  }

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

  function calculateMileage(){
    setMileageAmount(
      parseFloat(milesTravelled * parseFloat(mileageRate)).toFixed(2)
    );
  }

  function calculateAndAlert(){
    setMileageAmount(
      parseFloat(milesTravelled * parseFloat(mileageRate)).toFixed(2)
    );
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
            calculateMileage();
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
      <Button title="Log Mileage" onPress={() => calculateAndAlert()} />
    </ScrollView>
  );
};

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
