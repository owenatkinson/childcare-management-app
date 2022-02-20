import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';

export default class UpdateExpense extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dateOfExpense: '',
      expenseAmount: '',
      expenseNote: '',
      expenseTitle: '',
      receiptUrl: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('expenseLogs').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          dateOfExpense: user.date_of_expense,
          expenseAmount: user.expense_amount,
          expenseNote: user.expense_note,
          expenseTitle: user.expense_title,
          receiptUrl: user.receipt_url,
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

  editExpenseLog() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('expenseLogs').doc(this.state.key);
    docUpdate.set({
        date_of_expense: this.state.dateOfExpense,
        expense_amount: this.state.expenseAmount,
        expense_note: this.state.expenseNote,
        expense_title: this.state.expenseTitle,
        receipt_url: this.state.receiptUrl
    }).then(() => {
      this.setState({
        key: '',
        dateOfExpense: '',
        expenseAmount: '',
        expenseNote: '',
        expenseTitle: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ViewExpenses');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteExpenseLog() {
    const docRef = app.firestore().collection('expenseLogs').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          this.props.navigation.navigate('ViewExpenses');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteExpenseLog()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }

    uploadImage(result.uri);
};

  render() {
    let receiptButton;
    if(this.state.receiptUrl !== ""){
      receiptButton = <Button
        title='View Receipt'
        onPress={() => this.props.navigation.navigate('ReceiptPreview', {
          receiptImage: this.state.receiptUrl
        })}
        color="#000000"
      />;
    } 
    // else {
    //   receiptButton = <Button
    //     title='Add Receipt'
    //     onPress={this.pickImage}
    //     color="#000000"
    //   />;
    // }
    return (
        <ScrollView>
            <View style={styles.space}></View>
                <Text style={styles.bold}>Expense Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Expense Title'}
                    value={this.state.expenseTitle}
                    onChangeText={(val) => this.inputEl(val, 'expenseTitle')}
                />
                <Text style={styles.bold}>Date of Expense</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'1/1/2022'}
                    value={this.state.dateOfExpense}
                    onChangeText={(val) => this.inputEl(val, 'dateOfExpense')}
                />
                <Text style={styles.bold}>Expense Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'0.00'}
                    value={this.state.expenseAmount}
                    onChangeText={(val) => this.inputEl(val, 'expenseAmount')}
                />
                <Text style={styles.bold}>Additional Notes</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Insert any additional information'}
                  value={this.state.expenseNote}
                  onChangeText={(val) => this.inputEl(val, 'expenseNote')}
                />
                <View style={styles.space}></View>
                {receiptButton}
            <View style={styles.space}></View>
            <Button
              style={styles.buttonText}
              title='Update'
              onPress={() => this.editExpenseLog()} 
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
  bold: {
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 15
  },
  space: {
    height: 20,
  },
  buttonText: {
    color: '#000000'
  }
})