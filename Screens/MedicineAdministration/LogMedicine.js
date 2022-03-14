import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Button } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { convertDate, convertTime } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default function LogMedicine({ navigation }) {
  const [medicineTitle, setMedicineTitle] = useState("");
  const medicineDate = useInput(new Date());
  const medicineTime = useInput(new Date());
  const [medicineReason, setMedicineReason] = useState("");
  const [medicineNotes, setMedicineNotes] = useState("");
  const [childNameArr, setChildNameArr] = useState([]);
  const [childName, setChildName] = useState("");
  const fireDB = app.firestore().collection("medicineAdministration");

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

  async function addLog() {
    await fireDB.add({
      child_name: childName,
      medicine_title: medicineTitle,
      medicine_date: medicineDate.date,
      medicine_time: convertTime(medicineTime.date),
      medicine_reason: medicineReason,
      medicine_notes: medicineNotes,
    });
    navigation.navigate("MedicineAdministration");
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child's Name</Text>
      <View>
        <ModalSelector
          style={styles.dropdown}
          data={childNameArr}
          onChange={(option) => {
            setChildName(option.label);
          }}
        >
          <Text style={styles.dropdownText}>Select a Child: {childName}</Text>
        </ModalSelector>
      </View>
      <Text style={styles.bold}>Medicine</Text>
      <TextInput
        style={styles.input}
        placeholder={"Medicine"}
        value={medicineTitle}
        onChangeText={setMedicineTitle}
      />
      <Text style={styles.bold}>Date Administered</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={medicineDate.showDatepicker}>
          {medicineDate.show && (
            <DateTimePicker
              testID="medicineDate"
              value={medicineDate.date}
              mode={medicineDate.mode}
              is24Hour={true}
              display="default"
              onChange={medicineDate.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Date: {convertDate(medicineDate.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Time Administered</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={medicineTime.showTimepicker}>
          {medicineTime.show && (
            <DateTimePicker
              testID="medicineTime"
              value={medicineTime.date}
              mode={medicineTime.mode}
              is24Hour={true}
              display="default"
              onChange={medicineTime.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Date: {convertTime(medicineTime.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>What was the reason for administering medication?</Text>
      <TextInput
        style={styles.input}
        placeholder={"Reason for medicine administration"}
        value={medicineReason}
        onChangeText={setMedicineReason}
      />
      <Text style={styles.bold}>Additional Notes</Text>
      <TextInput
        multiline={true}
        placeholder={"Insert any additional information"}
        numberOfLines={4}
        style={styles.extendedInput}
        value={medicineNotes}
        onChangeText={setMedicineNotes}
      />
      <View style={styles.space}></View>
      <Button title="Log Medicine Administration" onPress={() => addLog()} />
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
