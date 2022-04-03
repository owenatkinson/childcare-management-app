import React, { useState } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, convertTime, missingDataAlert, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

// navigation parameter to navigate the user to a new page
export default function LogVisitor({ navigation }) {
  // Initialising the state value of variables
  const [visitorName, setVisitorName] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const dateOfVisit = useInput(new Date());
  const timeIn = useInput();
  const timeOut = useInput();
  // Initialising connection to visitorLogs database table
  const fireDB = app.firestore().collection("visitorLogs");

  async function addVisitorLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(visitorName) || isInputEmpty(visitPurpose)) {
      missingDataAlert();
      return;
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        visitor_name: visitorName,
        date_of_visit: dateOfVisit.date,
        time_in: convertTime(timeIn.date),
        time_out: convertTime(timeOut.date),
        visit_purpose: visitPurpose,
      });
      // Navigate the user back to the VisitorLogs page
      navigation.navigate("VisitorLogs");
    }
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Visitor Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Visitor Name"}
        label={"Visitor Name"}
        value={visitorName}
        onChangeText={setVisitorName}
      />
      <Text style={styles.bold}>Date of Visit</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={dateOfVisit.showDatepicker}>
          {dateOfVisit.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={dateOfVisit.date}
              mode={dateOfVisit.mode}
              is24Hour={true}
              onChange={dateOfVisit.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Date: {convertDate(dateOfVisit.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Time In</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={timeIn.showTimepicker}>
          {timeIn.show && (
            <DateTimePicker
              value={timeIn.date}
              mode={timeIn.mode}
              is24Hour={true}
              onChange={timeIn.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Time: {convertTime(timeIn.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Time Out</Text>
      <TouchableOpacity style={styles.button} onPress={timeOut.showTimepicker}>
        {timeOut.show && (
          <DateTimePicker
            value={timeOut.date}
            mode={timeOut.mode}
            is24Hour={true}
            onChange={timeOut.onChange}
          />
        )}
        <Text style={styles.buttonText}>Choose a Time: {convertTime(timeOut.date)}</Text>
      </TouchableOpacity>
      <Text style={styles.bold}>Purpose of Visit</Text>
      <TextInput
        multiline={true}
        placeholder={"Purpose of Visit"}
        numberOfLines={4}
        style={styles.extendedInput}
        label={"Purpose of Visit"}
        value={visitPurpose}
        onChangeText={setVisitPurpose}
      />
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addVisitorLog()}>
        <Text style={styles.buttonTextMenu}>Log Visitor</Text>
      </Button>
    </ScrollView>
  );
}

// used to generate functionality for dateOfVisit
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

  const showTimepicker = () => {
    showMode("time");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  return {
    date,
    showDatepicker,
    showTimepicker,
    show,
    mode,
    onChange,
  };
}
