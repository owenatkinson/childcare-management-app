import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, convertTime } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default function LogAccidentReport({ navigation }) {
  const [childName, setChildName] = useState("");
  const [accidentNotes, setAccidentNotes] = useState("");
  const [accidentLocation, setAccidentLocation] = useState("");
  const [accidentDetail, setAccidentDetail] = useState("");
  const [accidentAction, setAccidentAction] = useState("");
  const [accidentMedicalAttention, setAccidentMedicalAttention] = useState("");
  const dateOfAccident = useInput(new Date());
  const timeOfAccident = useInput();
  const [childNameArr, setChildNameArr] = useState([]);

  useEffect(() => {
    const childNames = [];
    setChildNameArr([]);
    setChildName();
    let index = 0;

    app
      .firestore()
      .collection("children")
      .orderBy("child_name", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          childNames.push({
            key: index++,
            label: doc.data()["child_name"],
          });
        });
        setChildNameArr(childNames);
      });
  }, []);

  const fireDB = app.firestore().collection("accidentReports");

  async function addAccidentReport() {
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
    navigation.navigate("AccidentReports");
  }

  return (
    <ScrollView>
      <Text style={styles.bold}>Child Name:</Text>
      <View>
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
      <Button title="Log Accident Report" onPress={() => addAccidentReport()} />
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
