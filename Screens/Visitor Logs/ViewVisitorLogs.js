import React, { Component } from 'react';
import { FlatList, ScrollView, View, SafeAreaView } from 'react-native';
import app from '../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';
import MonthPick from '../../Components/MonthPick';
import { getMonth, getYear, doNumbersMatch, convertDateCheckType } from '../../Components/Functionality';
const styles = require('../../Styles/general');

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
              if(doNumbersMatch(getMonth(convertDateCheckType(this.state.date)), getMonth(convertDateCheckType(res.date_of_visit))) 
              && doNumbersMatch(getYear(convertDateCheckType(this.state.date)), getYear(convertDateCheckType(res.date_of_visit)))) {
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
                      <ListItem.Subtitle>Date: {convertDateCheckType(res.date_of_visit)}</ListItem.Subtitle>
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