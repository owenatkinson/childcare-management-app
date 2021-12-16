import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

class UpdateChildDetails extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      forename: '',
      surname: '',
      isActive: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('children').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          forename: user.child_forename,
          surname: user.child_surname,
          isActive: user.child_is_active,
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

  editChild() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('children').doc(this.state.key);
    docUpdate.set({
      child_forename: this.state.forename,
      child_surname: this.state.surname,
      child_is_active: this.state.isActive,
    }).then(() => {
      this.setState({
        key: '',
        forename: '',
        surname: '',
        isActive: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewChildren');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteChild() {
    const docRef = app.firestore().collection('children').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          console.log('Doc deleted.')
          this.props.navigation.navigate('ViewChildren');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteChild()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'Forename'}
              value={this.state.forename}
              onChangeText={(val) => this.inputEl(val, 'forename')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
              // multiline={true}
              placeholder={'Surname'}
              // numberOfLines={5}
              value={this.state.surname}
              onChangeText={(val) => this.inputEl(val, 'surname')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'Is Active'}
              value={this.state.isActive}
              onChangeText={(val) => this.inputEl(val, 'isActive')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.editChild()} 
            color="green"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.alertDialog}
            color="red"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  }
})

export default UpdateChildDetails;