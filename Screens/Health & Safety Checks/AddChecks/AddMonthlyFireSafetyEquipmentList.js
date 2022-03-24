import React, { useState } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import app from "../../../Components/firebase";
import "firebase/firestore";
const styles = require("../../../Styles/general");

export default function AddMonthlyFireSafetyEquipmentList({ route, navigation }) {
  const { changeDate } = route.params;
  const [monthlyFireSafetyNote, setMonthlyFireSafetyNote] = useState("");
  const fireDB = app.firestore().collection("monthlyFireSafetyEquipmentCheck");

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
