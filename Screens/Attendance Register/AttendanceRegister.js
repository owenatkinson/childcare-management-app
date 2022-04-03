import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import CheckBox from "@react-native-community/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, convertTime, missingDataAlert, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

// Uses parameter to navigate the user to a new page
function AttendanceRegister({ navigation }) {
  // Initialising the state value of variables
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [childName, setChildName] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [droppedBy, setDroppedBy] = useState("");
  const [temperatureChecked, setTemperatureChecked] = useState("");
  const dateOfAttendance = useInput(new Date());
  const checkInTime = useInput();
  const checkOutTime = useInput();
  const [childNameArr, setChildNameArr] = useState([]);
  const fireDB = app.firestore().collection("attendanceRegister");

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

  async function addAttendanceLog() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(droppedBy) || isInputEmpty(collectedBy) || childName == undefined) {
      missingDataAlert();
      return;
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        additional_notes: additionalNotes,
        check_in_time: convertTime(checkInTime.date),
        check_out_time: convertTime(checkOutTime.date),
        child_name: childName,
        collected_by: collectedBy,
        date_of_attendance: convertDate(dateOfAttendance.date),
        dropped_by: droppedBy,
        temperature_checked: temperatureChecked,
      });
      // Navigate the user back to the AccidentReports page
      navigation.navigate("Home");
    }
  }

  return (
    <ScrollView>
      <Text style={styles.bold}>Child Name:</Text>
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
      <Text style={styles.bold}>Date of Attendance:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={dateOfAttendance.showDatepicker}
        >
          {dateOfAttendance.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={dateOfAttendance.date}
              mode={dateOfAttendance.mode}
              is24Hour={true}
              onChange={dateOfAttendance.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Date: {convertDate(dateOfAttendance.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Check In Time:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={checkInTime.showTimepicker}
        >
          {checkInTime.show && (
            <DateTimePicker
              value={checkInTime.date}
              mode={checkInTime.mode}
              is24Hour={true}
              onChange={checkInTime.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Time: {convertTime(checkInTime.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Check Out Time:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={checkOutTime.showTimepicker}
        >
          {checkOutTime.show && (
            <DateTimePicker
              value={checkOutTime.date}
              mode={checkOutTime.mode}
              is24Hour={true}
              onChange={checkOutTime.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Time: {convertTime(checkOutTime.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Dropped By:</Text>
      <TextInput
        style={styles.input}
        placeholder={"Dropped By"}
        label={"Dropped By"}
        value={droppedBy}
        onChangeText={setDroppedBy}
      />
      <Text style={styles.bold}>Collected By:</Text>
      <TextInput
        style={styles.input}
        placeholder={"Collected By"}
        label={"Collected By"}
        value={collectedBy}
        onChangeText={setCollectedBy}
      />
      <View style={styles.checkBoxPositioning}>
        <Text style={styles.bold}>Temperature Checked:</Text>
        <CheckBox
          style={styles.checkBox}
          disabled={false}
          value={temperatureChecked}
          onValueChange={setTemperatureChecked}
          tintColors={{ true: "#0B8FDC", false: "orange" }}
        />
      </View>
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput
        style={styles.extendedInput}
        placeholder={"Insert any additional information"}
        multiline={true}
        numberOfLines={4}
        label={"Additional Notes"}
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
      />
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addAttendanceLog()}>
        <Text style={styles.buttonTextMenu}>Log Attendance</Text>
      </Button>
      <View style={styles.submitButtonSpace}></View>
    </ScrollView>
  );
}

// used to generate functionality for dateOfAttendance
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

export default AttendanceRegister;
