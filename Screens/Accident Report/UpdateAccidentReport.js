import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default class UpdateAccidentReport extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      childName: '',
      accidentDate: '',
      accidentTime: '',
      accidentNotes: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('accidentReports').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          childName: user.child_name,
          accidentDate: user.accident_date,
          accidentTime: user.accident_time,
          accidentNotes: user.accident_notes,
          isLoading: false
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
  }

  editAccidentReport() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('accidentReports').doc(this.state.key);
    docUpdate.set({
      child_name: this.state.childName,
      accident_date: this.state.accidentDate,
      accident_time: this.state.accidentTime,
      accident_notes: this.state.accidentNotes
    }).then(() => {
      this.setState({
        key: '',
        childName: '',
        accidentDate: '',
        accidentTime: '',
        accidentNotes: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewAccidentReports');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteAccidentReport() {
    const docRef = app.firestore().collection('accidentReports').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          this.props.navigation.navigate('ViewAccidentReports');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteAccidentReport()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    return (
        <ScrollView>
            <View style={styles.space}></View>
                <Text style={styles.bold}>Child Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Forename'}
                  value={this.state.childName}
                  onChangeText={(val) => this.inputEl(val, 'childName')}
                />
                <Text style={styles.bold}>Date of Accident</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Date of Accident'}
                  value={this.state.accidentDate}
                  onChangeText={(val) => this.inputEl(val, 'accidentDate')}
                />
                <Text style={styles.bold}>Accident Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Accident Time'}
                  value={this.state.accidentTime}
                  onChangeText={(val) => this.inputEl(val, 'accidentTime')}
                />
                <Text style={styles.bold}>Accident Notes</Text>
                <TextInput
                  multiline={true} 
                  numberOfLines={4}
                  style={styles.extendedInput}
                  placeholder={'Accident Notes'}
                  value={this.state.accidentNotes}
                  onChangeText={(val) => this.inputEl(val, 'accidentNotes')}
                />
            <View style={styles.space}></View>
            <Button
              title='Update'
              onPress={() => this.editAccidentReport()} 
              color="#0B8FDC"
            />
            <View style={styles.space}></View>
            <Button
              title='Delete'
              onPress={this.alertDialog}
              color="#EE752E"
            />
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  extendedInput: {
    backgroundColor: '#DADADA',
    padding: 10,
    borderWidth: 1,
    margin: 12,
    textAlignVertical: 'top'
  },
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  }
})