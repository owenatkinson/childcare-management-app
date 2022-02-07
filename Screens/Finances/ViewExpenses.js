import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

export default class ViewExpenses extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('expenseLogs');
    this.state = {
      isLoading: true,
      expenseLogs: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const expenseLogs = [];
    querySnapshot.forEach((res) => {
        const { expense_title, expense_note, expense_amount, date_of_expense } = res.data();
        expenseLogs.push({
            key: res.id,
            expense_title,
            expense_note,
            expense_amount,
            date_of_expense
        });
    });
    this.setState({
        expenseLogs,
        isLoading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.expenseLogs.map((res, i) => {
              return (
                <ListItem 
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateExpense", {
                      userkey: res.key
                    });
                  }}                        
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{res.expense_title}</ListItem.Title>
                    <ListItem.Subtitle>Date of Expense: {res.date_of_expense}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron 
                     color="black" 
                  />
                </ListItem>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
     flex: 1,
     paddingBottom: 20
    }
})