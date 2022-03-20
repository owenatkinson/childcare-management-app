import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { parseDate } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewMedicalInfo extends Component {
  constructor() {
    super();
    this.docs = app
      .firestore()
      .collection("medicineAdministration")
      .orderBy("medicine_date", "desc");
    this.state = {
      isLoading: true,
      medicineLogs: [],
      childNames: [],
      activeChildName: "",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const childNames = [];
    let index = 0;
    app
      .firestore()
      .collection("children")
      .orderBy("child_name", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          childNames.push({
            key: index++,
            label: document.data()["child_name"],
          });
        });
        this.setState({
          childNames: childNames,
        });
      });

    const medicineLogs = [];
    querySnapshot.forEach((result) => {
      const {
        child_name,
        medicine_title,
        medicine_date,
        medicine_time,
        medicine_reason,
        medicine_notes,
      } = result.data();
      medicineLogs.push({
        key: result.id,
        child_name,
        medicine_title,
        medicine_date,
        medicine_time,
        medicine_reason,
        medicine_notes,
      });
    });
    this.setState({
      medicineLogs,
      isLoading: false,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View>
          <ModalSelector
            data={this.state.childNames}
            initValue="Select Child"
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {this.state.medicineLogs.map((result, id) => {
          if (result.child_name == this.state.activeChildName) {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  this.props.navigation.navigate("UpdateMedicineLog", {
                    userkey: result.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{result.medicine_title}</ListItem.Title>
                  <ListItem.Subtitle>Date: {parseDate(result.medicine_date)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  }
}
