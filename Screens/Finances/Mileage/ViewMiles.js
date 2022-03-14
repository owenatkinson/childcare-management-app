import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, Text } from 'react-native';
import app from '../../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MonthPick from '../../../Components/MonthPick';
const styles = require('../../../Styles/general');

export default class ViewMiles extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('mileageLogs').orderBy('date_of_mileage', 'desc');
    this.state = {
      isLoading: true,
      mileageLogs: [],
      date: new Date(),
      mileageAmount: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  convertDate = (dateInput) => {
    return(moment(dateInput.toDate()).format('D/M/YYYY'));
  }

  parseDate = (dateInput) => {
    if(dateInput instanceof Date){
      return(moment(dateInput).format('D/M/YYYY'));
    } else {
      return(moment(dateInput.toDate()).format('D/M/YYYY'));
    }
  }

  getMonth(dateInput){
    dateInput = dateInput.split("/");
    var month = dateInput[1];
    return(month);
  }

  getYear(dateInput){
    dateInput = dateInput.split("/");
    var year = dateInput[2];
    return(year);
  }

  doNumbersMatch(num1, num2){
    return (num1 == num2);
  }

  fetchCollection = (querySnapshot) => {
    this.state.mileageAmount = 0;
    const mileageLogs = [];
    querySnapshot.forEach((res) => {
        const { mileage_amount, date_of_mileage } = res.data();
        mileageLogs.push({
            key: res.id,
            mileage_amount,
            date_of_mileage
        });
    });
    this.setState({
        mileageLogs,
        isLoading: false
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView edges={['bottom', 'left', 'right']}>
          <FlatList ListHeaderComponent={<MonthPick date={this.state.date} onChange={(newDate) => {this.setState({date: newDate}); this.state.mileageAmount = 0 }}/>}/>
        </SafeAreaView>
        <ScrollView style={styles.wrapper}>
            {
              this.state.mileageLogs.map((res, i) => {
                if(this.doNumbersMatch(this.getMonth(this.parseDate(this.state.date)), this.getMonth(this.parseDate(res.date_of_mileage))) 
                && this.doNumbersMatch(this.getYear(this.parseDate(this.state.date)), this.getYear(this.parseDate(res.date_of_mileage)))) {
                  this.state.mileageAmount += parseFloat(res.mileage_amount);
                  return (
                    <ListItem 
                      key={i}
                      onPress={() => {
                        this.props.navigation.navigate("UpdateMiles", {
                          userkey: res.key
                        });
                      }}                        
                      bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>£{res.mileage_amount}</ListItem.Title>
                        <ListItem.Subtitle>Date: {this.convertDate(res.date_of_mileage)}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron 
                        color="black" 
                      />
                    </ListItem>
                  );
                }
              })
            }
        </ScrollView>
        <Text style={styles.boldLargeText}>Month Total: £{parseFloat(this.state.mileageAmount).toFixed(2)}</Text>
      </View>
    );
  }
}