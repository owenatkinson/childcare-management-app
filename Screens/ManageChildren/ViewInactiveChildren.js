import React, { Component } from "react";
import { ScrollView } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
const styles = require("../../Styles/general");

export default class ViewInactiveChildren extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("children").orderBy("child_name", "asc");
    this.state = {
      isLoading: true,
      children: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
      children,
      isLoading: false,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        {this.state.children.map((result, id) => {
          if (result.child_is_active == false || result.child_is_active == "") {
            return (
              <ListItem
                key={id}
                onPress={() => {
                  this.props.navigation.navigate("UpdateChildDetails", {
                    userkey: result.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{result.child_name}</ListItem.Title>
                  <ListItem.Subtitle>Inactive</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            );
          }
        })}
      </ScrollView>
    );
  }
}
