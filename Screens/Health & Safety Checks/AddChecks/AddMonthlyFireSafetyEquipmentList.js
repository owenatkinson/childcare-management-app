import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../../Components/firebase";
import "firebase/firestore";
const styles = require("../../../Styles/general");

export default function AddMonthlyFireSafetyEquipmentList({ route }) {
  const { changeDate } = route.params;
  const [monthlyFireSafetyNote, setMonthlyFireSafetyNote] = useState("");
  const [monthlyFireSafetyIsCompleted, setMonthlyFireSafetyIsCompleted] = useState("");
  const fireDB = app.firestore().collection("monthlyFireSafetyEquipmentCheck");

  async function addCheck() {
    await fireDB.add({
      monthly_fire_safety_date: changeDate,
      monthly_fire_safety_note: monthlyFireSafetyNote,
      monthly_fire_safety_is_completed: monthlyFireSafetyIsCompleted,
    });
    this.props.navigation.navigate("HealthSafetyChecks");
  }

  return (
    <View>
      <View style={styles.titleHeader}>
        <Text style={styles.buttonText}>{changeDate}</Text>
      </View>
      <ScrollView>
        <View style={styles.space}></View>
        <Text style={styles.bold}>Notes:</Text>
        <TextInput
          placeholder={"Insert any additional information"}
          style={styles.extendedInput}
          multiline={true}
          numberOfLines={4}
          value={monthlyFireSafetyNote}
          onChangeText={setMonthlyFireSafetyNote}
        />
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Check Completed:</Text>
          <CheckBox
            style={styles.checkBox}
            value={monthlyFireSafetyIsCompleted}
            onValueChange={(monthlyFireSafetyIsCompleted) =>
              setMonthlyFireSafetyIsCompleted(monthlyFireSafetyIsCompleted)
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
