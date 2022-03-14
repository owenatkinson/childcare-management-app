import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, convertTime } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default function LogVisitor({ navigation }) {
  const [visitorName, setVisitorName] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const dateOfVisit = useInput(new Date());
  const timeIn = useInput();
  const timeOut = useInput();
  const fireDB = app.firestore().collection("visitorLogs");

  async function addVisitorLog() {
    await fireDB.add({
      visitor_name: visitorName,
      date_of_visit: dateOfVisit.date,
      time_in: convertTime(timeIn.date),
      time_out: convertTime(timeOut.date),
      visit_purpose: visitPurpose,
    });
    navigation.navigate("VisitorLogs");
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
              testID="dateOfVisit"
              value={dateOfVisit.date}
              mode={dateOfVisit.mode}
              is24Hour={true}
              display="default"
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
              testID="timeIn"
              value={timeIn.date}
              mode={timeIn.mode}
              is24Hour={true}
              display="default"
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
            testID="timeOut"
            value={timeOut.date}
            mode={timeOut.mode}
            is24Hour={true}
            display="default"
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
      <Button title="Log Visitor" onPress={() => addVisitorLog()} />
    </ScrollView>
  );
}

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
    setShow(Platform.OS === "ios");
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
