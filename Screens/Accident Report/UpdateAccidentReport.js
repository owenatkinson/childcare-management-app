import React, { Component } from "react";
import {
  Button,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Text,
} from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  convertDate,
  parseDate,
  convertToTimestamp,
} from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class UpdateAccidentReport extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      childName: "",
      accidentDate: "",
      accidentTime: "",
      accidentLocation: "",
      accidentDetail: "",
      accidentAction: "",
      accidentMedicalAttention: "",
      accidentNotes: "",
      date: new Date(),
      show: false,
      childNames: [],
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      accidentDate: convertDate(currentDate),
      show: false,
    });
  };

  showDatepicker() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    const docRef = app
      .firestore()
      .collection("accidentReports")
      .doc(this.props.route.params.userkey);
    const childNames = [];
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
        this.setState({
          childNames: childNames,
        });
      });
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          childName: user.child_name,
          accidentDate: parseDate(user.accident_date),
          accidentTime: user.accident_time,
          accidentNotes: user.accident_notes,
          accidentLocation: user.accident_location,
          accidentDetail: user.accident_detail,
          accidentAction: user.accident_action,
          accidentMedicalAttention: user.accident_medical_attention,
          isLoading: false,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  editAccidentReport() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app
      .firestore()
      .collection("accidentReports")
      .doc(this.state.key);
    docUpdate
      .set({
        child_name: this.state.childName,
        accident_date: convertToTimestamp(this.state.accidentDate),
        accident_time: this.state.accidentTime,
        accident_notes: this.state.accidentNotes,
        accident_location: this.state.accidentLocation,
        accident_detail: this.state.accidentDetail,
        accident_action: this.state.accidentAction,
        accident_medical_attention: this.state.accidentMedicalAttention,
      })
      .then(() => {
        this.setState({
          key: "",
          isLoading: false,
        });
        this.props.navigation.navigate("ViewAccidentReports");
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteAccidentReport() {
    const docRef = app
      .firestore()
      .collection("accidentReports")
      .doc(this.props.route.params.userkey);
    docRef.delete().then((res) => {
      this.props.navigation.navigate("ViewAccidentReports");
    });
  }

  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteAccidentReport() },
        {
          text: "No",
          onPress: () => console.log("Item not deleted"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    return (
      <ScrollView>
        <Text style={styles.bold}>Child Name</Text>
        <View>
          <ModalSelector
            style={styles.dropdown}
            data={this.state.childNames}
            onChange={(option) => {
              this.setState({ childName: option.label });
            }}
          >
          <Text style={styles.dropdownText}>Select Child: {this.state.childName}</Text>
          </ModalSelector>
        </View>
        <Text style={styles.bold}>Date of Accident:</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showDatepicker()}
          >
            {this.state.show && (
              <DateTimePicker
                maximumDate={new Date()}
                value={this.state.date}
                mode="date"
                onChange={this.onChange}
              />
            )}
            <Text style={styles.buttonText}>
              Choose a Date: {this.state.accidentDate}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bold}>Accident Time:</Text>
        <TextInput
          style={styles.input}
          placeholder={"00:00"}
          value={this.state.accidentTime}
          onChangeText={(val) => this.inputEl(val, "accidentTime")}
        />
        <Text style={styles.bold}>Accident Location:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Location"}
          value={this.state.accidentLocation}
          onChangeText={(val) => this.inputEl(val, "accidentLocation")}
        />
        <Text style={styles.bold}>Accident Details:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Detail"}
          value={this.state.accidentDetail}
          onChangeText={(val) => this.inputEl(val, "accidentDetail")}
        />
        <Text style={styles.bold}>Actions Taken:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Action"}
          value={this.state.accidentAction}
          onChangeText={(val) => this.inputEl(val, "accidentAction")}
        />
        <Text style={styles.bold}>Medication Administered:</Text>
        <TextInput
          style={styles.input}
          placeholder={"Accident Medical Attention"}
          value={this.state.accidentMedicalAttention}
          onChangeText={(val) => this.inputEl(val, "accidentMedicalAttention")}
        />
        <Text style={styles.bold}>Accident Notes:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.extendedInput}
          placeholder={"Insert any additional information"}
          value={this.state.accidentNotes}
          onChangeText={(val) => this.inputEl(val, "accidentNotes")}
        />
        <View style={styles.space}></View>
        <Button
          title="Update"
          onPress={() => this.editAccidentReport()}
          color="#0B8FDC"
        />
        <View style={styles.space}></View>
        <Button title="Delete" onPress={this.alertDialog} color="#EE752E" />
      </ScrollView>
    );
  }
}
