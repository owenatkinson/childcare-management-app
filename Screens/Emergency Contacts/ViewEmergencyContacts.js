import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import app from "../../Components/firebase";
import "firebase/firestore";
import ModalSelector from "react-native-modal-selector";
const styles = require("../../Styles/general");

export default class ViewEmergencyContacts extends Component {
  constructor() {
    super();
    // Query the database to gather all children data and store in a variable
    this.docs = app
      .firestore()
      .collection("children");
    // Initialising the state value of variables
    this.state = {
      contactDetails: [],
      childNames: [],
      activeChildName: "",
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Forward the user to their phonebook, auto-filling the phone with the contact details that they clicked on
  forwardToPhonebook(source) {
    Linking.openURL(`tel:${source}`);
  }

  fetchCollection = (querySnapshot) => {
    const contactDetails = [], childNames = [];
    let index = 0;

    // Query the database to gather names of all children, store these names in childNames array and set the state value
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
        this.setState({
          childNames: childNames,
        });
      });

    // Gather emergency contact data, store it to the contactDetails array and set the state value
    querySnapshot.forEach((result) => {
      const { child_name, child_emergency_contact_name_1, child_emergency_contact_name_2, child_emergency_contact_name_3, child_emergency_contact_number_1, 
        child_emergency_contact_number_2, child_emergency_contact_number_3, child_emergency_contact_relation_1, child_emergency_contact_relation_2, child_emergency_contact_relation_3 } = result.data();
      contactDetails.push({
        key: result.id,
        child_name,
        child_emergency_contact_name_1,
        child_emergency_contact_name_2,
        child_emergency_contact_name_3,
        child_emergency_contact_number_1,
        child_emergency_contact_number_2,
        child_emergency_contact_number_3,
        child_emergency_contact_relation_1,
        child_emergency_contact_relation_2,
        child_emergency_contact_relation_3
      });
    });
    this.setState({
      contactDetails: contactDetails,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          {/* ModalSelector populated with children names from childNames */}
          <ModalSelector
            data={this.state.childNames}
            style={styles.navyText}
            initValue="Select Child"
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {/* For each item in contactDetails */}
        {this.state.contactDetails.map((contact, id, i) => {
          // Display the emergency contact info regarding the child name selected the modal selector
          if (contact.child_name == this.state.activeChildName) {
            return (
              <View key={id}>
                <View style={styles.space}></View>
                <View style={styles.iconPadding}>
                  <Text style={styles.navyTextWithLeftMargin}>Name: {contact.child_emergency_contact_name_1} ({contact.child_emergency_contact_relation_1})</Text>
                  <MaterialIcons
                    name={"phone"}
                    size={30}
                    color="#EE752E"
                    style={styles.phoneIcon}
                    onPress={() => {
                      this.forwardToPhonebook(contact.child_emergency_contact_number_1);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    this.forwardToPhonebook(contact.child_emergency_contact_number_1);
                  }}>Phone Number: {contact.child_emergency_contact_number_1}
                </Text>
                <View style={styles.horizontalRule}></View>
                <View style={styles.space}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.navyTextWithLeftMargin}>Name: {contact.child_emergency_contact_name_2} ({contact.child_emergency_contact_relation_2})</Text>
                  <MaterialIcons
                    name={"phone"}
                    size={30}
                    color="#EE752E"
                    style={styles.phoneIcon}
                    onPress={() => {
                      this.forwardToPhonebook(contact.child_emergency_contact_number_2);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    this.forwardToPhonebook(contact.child_emergency_contact_number_2);
                  }}>Phone Number: {contact.child_emergency_contact_number_2}
                </Text>
                <View style={styles.horizontalRule}></View>
                <View style={styles.space}></View>
                <View style={styles.iconPadding}>
                  <Text style={styles.navyTextWithLeftMargin}>Name: {contact.child_emergency_contact_name_3} ({contact.child_emergency_contact_relation_3})</Text>
                  <MaterialIcons
                    name={"phone"}
                    size={30}
                    color="#EE752E"
                    style={styles.phoneIcon}
                    onPress={() => {
                      this.forwardToPhonebook(contact.child_emergency_contact_number_3);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    this.forwardToPhonebook(contact.child_emergency_contact_number_3);
                  }}>Phone Number: {contact.child_emergency_contact_number_3}
                </Text>
              </View>
            );
          } else {
            null;
          }
        })}
      </View>
    );
  }
}
