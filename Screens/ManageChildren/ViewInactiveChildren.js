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
    querySnapshot.forEach((res) => {
      const { child_name, child_is_active } = res.data();
      children.push({
        key: res.id,
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
        {this.state.children.map((res, i) => {
          if (res.child_is_active == false || res.child_is_active == "") {
            return (
              <ListItem
                key={i}
                onPress={() => {
                  this.props.navigation.navigate("UpdateChildDetails", {
                    userkey: res.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{res.child_name}</ListItem.Title>
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
