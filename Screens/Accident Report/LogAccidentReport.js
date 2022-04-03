import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, convertTime, missingDataAlert, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

// navigation parameter to navigate the user to a new page
export default function LogAccidentReport({ navigation }) {
  // Initialising the state value of variables
  const [childName, setChildName] = useState("");
  const [accidentNotes, setAccidentNotes] = useState("");
  const [accidentLocation, setAccidentLocation] = useState("");
  const [accidentDetail, setAccidentDetail] = useState("");
  const [accidentAction, setAccidentAction] = useState("");
  const [accidentMedicalAttention, setAccidentMedicalAttention] = useState("");
  const dateOfAccident = useInput(new Date());
  const timeOfAccident = useInput();
  const [childNameArr, setChildNameArr] = useState([]);
  // Initialising connection to accidentReports database table
  const fireDB = app.firestore().collection("accidentReports");

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

  async function addAccidentReport() {
    // Complete validation checks, if any are invalid an alert will be displayed
    if (isInputEmpty(accidentLocation) || isInputEmpty(accidentDetail) || isInputEmpty(accidentAction) || isInputEmpty(accidentMedicalAttention) || childName == undefined) {
      missingDataAlert();
      return;
    // If inputs are valid, add variable values to the database
    } else {
      await fireDB.add({
        child_name: childName,
        accident_date: dateOfAccident.date,
        accident_time: convertTime(timeOfAccident.date),
        accident_notes: accidentNotes,
        accident_location: accidentLocation,
        accident_detail: accidentDetail,
        accident_action: accidentAction,
        accident_medical_attention: accidentMedicalAttention,
      });
      // Navigate the user back to the AccidentReports page
      navigation.navigate("AccidentReports");
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
      <Text style={styles.bold}>Date of Accident:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={dateOfAccident.showDatepicker}
        >
          {dateOfAccident.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={dateOfAccident.date}
              mode={dateOfAccident.mode}
              is24Hour={true}
              onChange={dateOfAccident.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Date: {convertDate(dateOfAccident.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Accident Time:</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={timeOfAccident.showTimepicker}
        >
          {timeOfAccident.show && (
            <DateTimePicker
              value={timeOfAccident.date}
              mode={timeOfAccident.mode}
              is24Hour={true}
              onChange={timeOfAccident.onChange}
            />
          )}
          <Text style={styles.buttonText}>
            Choose a Time: {convertTime(timeOfAccident.date)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Accident Location:</Text>
      <TextInput
        style={styles.input}
        placeholder={"Accident Location"}
        label={"Accident Location"}
        value={accidentLocation}
        onChangeText={setAccidentLocation}
      />
      <Text style={styles.bold}>Accident Details:</Text>
      <TextInput
        multiline={true}
        placeholder={"Accident Detail"}
        numberOfLines={4}
        style={styles.extendedInput}
        label={"Accident Detail"}
        value={accidentDetail}
        onChangeText={setAccidentDetail}
      />
      <Text style={styles.bold}>Actions Taken:</Text>
      <TextInput
        style={styles.input}
        placeholder={"Accident Action"}
        label={"Accident Action"}
        value={accidentAction}
        onChangeText={setAccidentAction}
      />
      <Text style={styles.bold}>Medication Administered:</Text>
      <TextInput
        style={styles.input}
        placeholder={"Accident Medical Attention"}
        label={"Accident Medical Attention"}
        value={accidentMedicalAttention}
        onChangeText={setAccidentMedicalAttention}
      />
      <Text style={styles.bold}>Additional Notes:</Text>
      <TextInput
        multiline={true}
        placeholder={"Insert any additional information"}
        numberOfLines={4}
        style={styles.extendedInput}
        label={"Accident Notes"}
        value={accidentNotes}
        onChangeText={setAccidentNotes}
      />
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addAccidentReport()}>
        <Text style={styles.buttonTextMenu}>Log Accident Report</Text>
      </Button>
      <View style={styles.submitButtonSpace}></View>
    </ScrollView>
  );
}

// used to generate functionality for dateOfAccident and timeOfAccident
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
