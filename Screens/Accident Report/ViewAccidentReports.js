import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import app from "../../Components/firebase";
import "firebase/firestore";
import { ListItem } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { parseDate } from "../../Components/Functionality";
const styles = require("../../Styles/general");

export default class ViewAccidentReports extends Component {
  constructor() {
    super();
    this.docs = app
      .firestore()
      .collection("accidentReports")
      .orderBy("accident_date", "desc");
    this.state = {
      isLoading: true,
      accidentReports: [],
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
    const accidentReports = [];
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

    querySnapshot.forEach((res) => {
      const { child_name, accident_date, accident_time, accident_notes } =
        res.data();
      accidentReports.push({
        key: res.id,
        child_name,
        accident_date,
        accident_time,
        accident_notes,
      });
    });
    this.setState({
      accidentReports,
      isLoading: false,
    });
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View>
          <ModalSelector
            data={this.state.childNames}
            initValue="Select a Child"
            onChange={(option) => {
              this.setState({ activeChildName: option.label });
            }}
          />
        </View>
        {this.state.accidentReports.map((res, i) => {
          if (res.child_name == this.state.activeChildName) {
            return (
              <ListItem
                key={i}
                onPress={() => {
                  this.props.navigation.navigate("UpdateAccidentReport", {
                    userkey: res.key,
                  });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{res.child_name}</ListItem.Title>
                  <ListItem.Subtitle>
                    Date: {parseDate(res.accident_date)}
                  </ListItem.Subtitle>
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
