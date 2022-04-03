import React, { useState } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
const styles = require("../../../Styles/general");

// navigation parameter to navigate the user to a new page, route parameter to set the date 
export default function AddMonthlyFireSafetyEquipmentList({ route, navigation }) {
  const { changeDate } = route.params;
  // Initialising the state value of variables
  const [monthlyFireSafetyNote, setMonthlyFireSafetyNote] = useState("");
  // Initialising connection to monthlyFireSafetyEquipmentCheck database table
  const fireDB = app.firestore().collection("monthlyFireSafetyEquipmentCheck");

  // Add variable values to the database and navigate the user to HealthSafetyChecks page
  async function addCheck() {
    await fireDB.add({
      monthly_fire_safety_date: changeDate,
      monthly_fire_safety_note: monthlyFireSafetyNote
    });
    navigation.navigate("HealthSafetyChecks");
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
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => addCheck()}>
          <Text style={styles.buttonTextMenu}>Submit Check</Text>
        </Button>
      </ScrollView>
    </View>
  );
}
