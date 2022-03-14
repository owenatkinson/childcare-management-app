import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, Text } from 'react-native';
import app from '../../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import MonthPick from '../../../Components/MonthPick';
import { parseDate, getMonth, getYear, doNumbersMatch, convertDateCheckType } from '../../../Components/Functionality';
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
                if(doNumbersMatch(getMonth(convertDateCheckType(this.state.date)), getMonth(convertDateCheckType(res.date_of_mileage))) 
                && doNumbersMatch(getYear(convertDateCheckType(this.state.date)), getYear(convertDateCheckType(res.date_of_mileage)))) {
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
                        <ListItem.Subtitle>Date: {parseDate(res.date_of_mileage)}</ListItem.Subtitle>
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