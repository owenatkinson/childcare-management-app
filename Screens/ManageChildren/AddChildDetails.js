import React, { useState } from "react";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import app from "../../Components/firebase";
import "firebase/firestore";
import CheckBox from "@react-native-community/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDate, missingDataAlert, isInputEmpty } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default function AddNewChild({ navigation }) {
  const [childName, setChildName] = useState("");
  const childDOB = useInput(new Date());
  const [childAllergies, setChildAllergies] = useState("");
  const [childAllergiesDetails, setChildAllergiesDetails] = useState("");
  const [childMedicalConditions, setChildMedicalConditions] = useState("");
  const [childMedicalConditionsDetails, setChildMedicalConditionsDetails] = useState("");
  const [childIsActive, setChildIsActive] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorNumber, setDoctorNumber] = useState("");
  const [childHomeAddress, setChildHomeAddress] = useState("");
  const [childEmergencyContactName1, setChildEmergencyContactName1] = useState("");
  const [childEmergencyNumber1, setChildEmergencyNumber1] = useState("");
  const [childEmergencyRelation1, setChildEmergencyRelation1] = useState("");
  const [childEmergencyContactName2, setChildEmergencyContactName2] = useState("");
  const [childEmergencyNumber2, setChildEmergencyNumber2] = useState("");
  const [childEmergencyRelation2, setChildEmergencyRelation2] = useState("");
  const [childEmergencyContactName3, setChildEmergencyContactName3] = useState("");
  const [childEmergencyNumber3, setChildEmergencyNumber3] = useState("");
  const [childEmergencyRelation3, setChildEmergencyRelation3] = useState("");
  const fireDB = app.firestore().collection("children");

  async function addChild() {
    if (isInputEmpty(doctorName) || isInputEmpty(childHomeAddress) || childName == undefined || isInputEmpty(childEmergencyContactName1) || isInputEmpty(childEmergencyNumber1)
      || isInputEmpty(childEmergencyRelation1) || isInputEmpty(doctorAddress) || isInputEmpty(doctorNumber) || isInputEmpty(childEmergencyContactName2) || isInputEmpty(childEmergencyNumber2) 
      || isInputEmpty(childEmergencyRelation2) || isInputEmpty(childEmergencyRelation3) || isInputEmpty(childEmergencyContactName3) || isInputEmpty(childEmergencyNumber3)) {
      missingDataAlert();
      return;
    } else {
      await fireDB.add({
        child_name: childName,
        child_DOB: convertDate(childDOB.date),
        child_allergies: childAllergies,
        child_allergies_details: childAllergiesDetails,
        child_medical_conditions: childMedicalConditions,
        child_medical_conditions_details: childMedicalConditionsDetails,
        child_is_active: childIsActive,
        child_emergency_contact_name_1: childEmergencyContactName1,
        child_emergency_contact_number_1: childEmergencyNumber1,
        child_emergency_contact_relation_1: childEmergencyRelation1,
        child_emergency_contact_name_2: childEmergencyContactName2,
        child_emergency_contact_number_2: childEmergencyNumber2,
        child_emergency_contact_relation_2: childEmergencyRelation2,
        child_emergency_contact_name_3: childEmergencyContactName3,
        child_emergency_contact_number_3: childEmergencyNumber3,
        child_emergency_contact_relation_3: childEmergencyRelation3,
        doctor_name: doctorName,
        doctor_address: doctorAddress,
        doctor_number: doctorNumber,
        child_home_address: childHomeAddress
      });
      navigation.navigate("ManageChildren");
    }
  }

  return (
    <ScrollView>
      <View style={styles.space}></View>
      <Text style={styles.bold}>Child Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Child Name"}
        label={"Child Name"}
        value={childName}
        onChangeText={setChildName}
      />
      <Text style={styles.bold}>Child's Date of Birth</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={childDOB.showDatepicker}>
          {childDOB.show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={childDOB.date}
              mode={childDOB.mode}
              is24Hour={true}
              onChange={childDOB.onChange}
            />
          )}
          <Text style={styles.buttonText}>Choose a Date: {convertDate(childDOB.date)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bold}>Child's Allergies</Text>
      <TextInput
        style={styles.input}
        placeholder={"List Child's Allergies"}
        value={childAllergies}
        onChangeText={setChildAllergies}
      />
      <Text style={styles.bold}>Allergy Details</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.extendedInput}
        placeholder={"Insert details of the child's allergies"}
        value={childAllergiesDetails}
        onChangeText={setChildAllergiesDetails}
      />
      <Text style={styles.bold}>Child's Medical Conditions</Text>
      <TextInput
        style={styles.input}
        placeholder={"List Child's Medical Conditions"}
        value={childMedicalConditions}
        onChangeText={setChildMedicalConditions}
      />
      <Text style={styles.bold}>Medical Condition Details</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.extendedInput}
        placeholder={"Insert details of the child's medical conditions"}
        value={childMedicalConditionsDetails}
        onChangeText={setChildMedicalConditionsDetails}
      />
      <View style={styles.checkBoxPositioning}>
        <Text style={styles.bold}>Child is actively under your care:</Text>
        <CheckBox
          style={styles.checkBox}
          disabled={false}
          value={childIsActive}
          onValueChange={setChildIsActive}
          tintColors={{ true: "#0B8FDC", false: "orange" }}
        />
      </View>
      <Text style={styles.boldTextCheckbox}>Child's Home Address</Text>
      <TextInput
        style={styles.input}
        placeholder={"Child's Home Address"}
        value={childHomeAddress}
        onChangeText={setChildHomeAddress}
      />
      <View style={styles.horizontalRule}></View>
      <Text style={styles.bold}>Emergency Contact 1</Text>
      <Text style={styles.bold}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Name"}
        value={childEmergencyContactName1}
        onChangeText={setChildEmergencyContactName1}
      />
      <Text style={styles.bold}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Phone Number"}
        value={childEmergencyNumber1}
        onChangeText={setChildEmergencyNumber1}
      />
      <Text style={styles.bold}>Relation</Text>
      <TextInput
        style={styles.input}
        placeholder={"Relation to Child"}
        value={childEmergencyRelation1}
        onChangeText={setChildEmergencyRelation1}
      />
      <View style={styles.horizontalRule}></View>
      <Text style={styles.bold}>Emergency Contact 2</Text>
      <Text style={styles.bold}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Name"}
        value={childEmergencyContactName2}
        onChangeText={setChildEmergencyContactName2}
      />
      <Text style={styles.bold}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Phone Number"}
        value={childEmergencyNumber2}
        onChangeText={setChildEmergencyNumber2}
      />
      <Text style={styles.bold}>Relation</Text>
      <TextInput
        style={styles.input}
        placeholder={"Relation to Child"}
        value={childEmergencyRelation2}
        onChangeText={setChildEmergencyRelation2}
      />
      <View style={styles.horizontalRule}></View>
      <Text style={styles.bold}>Emergency Contact 3</Text>
      <Text style={styles.bold}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Name"}
        value={childEmergencyContactName3}
        onChangeText={setChildEmergencyContactName3}
      />
      <Text style={styles.bold}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={"Emergency Contact Phone Number"}
        value={childEmergencyNumber3}
        onChangeText={setChildEmergencyNumber3}
      />
      <Text style={styles.bold}>Relation</Text>
      <TextInput
        style={styles.input}
        placeholder={"Relation to Child"}
        value={childEmergencyRelation3}
        onChangeText={setChildEmergencyRelation3}
      />
      <View style={styles.horizontalRule}></View>
      <Text style={styles.bold}>Doctor's Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Name of Doctor"}
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <Text style={styles.bold}>Doctor's Address</Text>
      <TextInput
        style={styles.input}
        placeholder={"Address of Doctors Practice"}
        value={doctorAddress}
        onChangeText={setDoctorAddress}
      />
      <Text style={styles.bold}>Doctor's Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={"Doctor's Phone Number"}
        value={doctorNumber}
        onChangeText={setDoctorNumber}
      />
      <View style={styles.space}></View>
      <Button 
        mode="contained"
        uppercase={false}
        color="#0B8FDC"
        onPress={() => addChild()}>
        <Text style={styles.buttonTextMenu}>Add Child</Text>
      </Button>
      <View style={styles.submitButtonSpace}></View>
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
