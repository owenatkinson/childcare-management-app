import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../../Components/firebase";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertTime } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default function AddMonthlyDrillList({ route, navigation }) {
  const { changeDate } = route.params;
  const [monthlyFireDrillNumberOfPeople, setMonthlyFireDrillNumberOfPeople] = useState("");
  const [monthlyFireDrillNote, setMonthlyFireDrillNote] = useState("");
  const [monthlyFireDrillIsCompleted, setMonthlyFireDrillIsCompleted] = useState("");
  const monthlyFireDrillTimeCompleted = useInput();

  const fireDB = app.firestore().collection("monthlyFireDrill");

  async function addCheck() {
    await fireDB.add({
      monthly_fire_drill_date: changeDate,
      monthly_fire_drill_num_of_people: monthlyFireDrillNumberOfPeople,
      monthly_fire_drill_time_completed: monthlyFireDrillTimeCompleted.date,
      monthly_fire_drill_note: monthlyFireDrillNote,
      monthly_fire_drill_is_completed: monthlyFireDrillIsCompleted,
    });
    navigation.navigate("HealthSafetyChecks");
  }

  return (
    <View>
      <View style={styles.titleHeader}>
        <Text style={styles.buttonText}>{changeDate}</Text>
      </View>
      <View style={styles.space}></View>
      <ScrollView>
        <Text style={styles.bold}>Number of People:</Text>
        <TextInput
          placeholder={"Number of People present"}
          style={styles.input}
          value={monthlyFireDrillNumberOfPeople}
          onChangeText={setMonthlyFireDrillNumberOfPeople}
        />
        <Text style={styles.bold}>Time Completed:</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={monthlyFireDrillTimeCompleted.showTimepicker}
          >
            {monthlyFireDrillTimeCompleted.show && (
              <DateTimePicker
                testID="dateOfAccident"
                value={monthlyFireDrillTimeCompleted.date}
                mode={monthlyFireDrillTimeCompleted.mode}
                is24Hour={true}
                display="default"
                onChange={monthlyFireDrillTimeCompleted.onChange}
              />
            )}
            <Text style={styles.buttonText}>
              Choose a Time: {convertTime(monthlyFireDrillTimeCompleted.date)}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Additional Notes:</Text>
        <TextInput
          placeholder={"Insert any additional information"}
          style={styles.extendedInput}
          multiline={true}
          numberOfLines={4}
          value={monthlyFireDrillNote}
          onChangeText={setMonthlyFireDrillNote}
        />
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Check Completed:</Text>
          <CheckBox
            style={styles.checkBox}
            value={monthlyFireDrillIsCompleted}
            onValueChange={(monthlyFireDrillIsCompleted) =>
              setMonthlyFireDrillIsCompleted(monthlyFireDrillIsCompleted)
            }
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.space}></View>
        <Button title="Submit Check" onPress={() => addCheck()} />
      </ScrollView>
    </View>
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
    showTimepicker,
    show,
    mode,
    onChange,
  };
}
