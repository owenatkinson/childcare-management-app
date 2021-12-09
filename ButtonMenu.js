import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Buttons = (props) => {
  return (
    <View>
       <Button
          title={props.name}
          style={styles.button}
        />
      <View style={styles.space}></View>
    </View>
  );
}

const ButtonMenu = () => {
  return (
    <View style={styles.fixToText}>
      <Buttons name="Attendance Register"></Buttons>
      <Buttons name="Health & Safety Checks"></Buttons>
      <Buttons name="Planner"></Buttons>
      <Buttons name="Manage Children"></Buttons>
      <Buttons name="Policies"></Buttons>
      <Buttons name="Finances"></Buttons>
      <Buttons name="Allergy Detection"></Buttons>
      <Buttons name="Accident Reports"></Buttons>
      <Buttons name="View Logs"></Buttons>
      <Buttons name="Visitor Logs"></Buttons>
    </View>
  );
}

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
      padding: 10,
    },
    space: {
      height: 20,
    }
  });

export default ButtonMenu;