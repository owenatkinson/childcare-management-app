import React, { Component } from "react";
import { ScrollView } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
const styles = require("../../Styles/general");

export default class ViewChildren extends Component {
  constructor() {
    super();
    // Query the database to gather all child data and store in a variable
    this.docs = app
      .firestore()
      .collection("children")
      .orderBy("child_name", "asc");
    // Initialising the state value of variables
    this.state = {
      children: [],
    };
  }

  // This runs after the render function and runs fetchCollection to load data from the database into the page
  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Query the database to gather child data, store this in the children array and set the state value
  fetchCollection = (querySnapshot) => {
    const children = [];
    querySnapshot.forEach((result) => {
      const { child_name, child_is_active } = result.data();
      children.push({
        key: result.id,
        child_name,
        child_is_active,
      });
    });
    this.setState({
      children: children,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        {/* For each child in children array */}
        {this.state.children.map((result, id) => {
          // If child is actively in care, display them
          if (result.child_is_active == true) {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  // Navigate to the UpdateChildDetails page and populate fields data using the userkey variable as an identifier
                  this.props.navigation.navigate("UpdateChildDetails", {
                    userkey: result.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.navyBoldText}>{result.child_name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.navyStandardText}>Active</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#02314D" />
              </ListItem>
            );
          }
        })}
      </ScrollView>
    );
  }
}
