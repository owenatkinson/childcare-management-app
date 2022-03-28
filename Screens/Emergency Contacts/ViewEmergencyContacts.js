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
    this.docs = app
      .firestore()
      .collection("children");
    this.state = {
      isLoading: true,
      contactDetails: [],
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
    const contactDetails = [];
    const childNames = [];
    let index = 0;
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
      contactDetails,
      isLoading: false,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <ModalSelector
            data={this.state.childNames}
            style={styles.navyText}
            initValue="Select Child"
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {this.state.contactDetails.map((contact, id, i) => {
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
                      Linking.openURL(`tel:${contact.child_emergency_contact_number_1}`);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    Linking.openURL(`tel:${contact.child_emergency_contact_number_1}`);
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
                      Linking.openURL(`tel:${contact.child_emergency_contact_number_2}`);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    Linking.openURL(`tel:${contact.child_emergency_contact_number_2}`);
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
                      Linking.openURL(`tel:${contact.child_emergency_contact_number_3}`);
                    }}
                  />
                </View>
                <Text style={styles.boldBlueText} 
                  onPress={() => {
                    Linking.openURL(`tel:${contact.child_emergency_contact_number_3}`);
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
