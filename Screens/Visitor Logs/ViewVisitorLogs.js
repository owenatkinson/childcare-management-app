import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MonthPick from '../../MonthPick';

export default class ViewVisitorLogs extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection("visitorLogs").orderBy('date_of_visit', 'desc');
    this.state = {
      isLoading: true,
      visitorLogs: [],
      date: new Date()
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  convertDate = (dateInput) => {
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
    const visitorLogs = [];
    querySnapshot.forEach((res) => {
      const { visitor_name, date_of_visit, time_in, time_out, visit_purpose } = res.data();
      visitorLogs.push({
        key: res.id,
        visitor_name,
        date_of_visit,
        time_in,
        time_out,
        visit_purpose
      });
    });
    this.setState({
      visitorLogs,
      isLoading: false,
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView edges={['bottom', 'left', 'right']}>
          <FlatList ListHeaderComponent={<MonthPick date={this.state.date} onChange={(newDate) => this.setState({date: newDate})}/>}/>
        </SafeAreaView>
        <ScrollView>
          {
            this.state.visitorLogs.map((res, i) => {
              if(this.doNumbersMatch(this.getMonth(this.convertDate(this.state.date)), this.getMonth(this.convertDate(res.date_of_visit))) 
              && this.doNumbersMatch(this.getYear(this.convertDate(this.state.date)), this.getYear(this.convertDate(res.date_of_visit)))) {
                return (
                  <ListItem 
                    key={i}
                    onPress={() => {
                      this.props.navigation.navigate("UpdateVisitorLog", {
                        userkey: res.key
                      });
                    }}                        
                    bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{res.visitor_name}</ListItem.Title>
                      <ListItem.Subtitle>Date: {this.convertDate(res.date_of_visit)}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron 
                      color="black" 
                    />
                  </ListItem>
                );
              } else {
                return null;
              }
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
     flex: 1,
     paddingBottom: 20
    }
})