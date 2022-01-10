import React, {Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import app from '../../../firebase';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

export default class MonthlyFireSafetyEquipmentList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('monthlyFireSafetyEquipmentCheck');
    this.state = {
      isLoading: true,
      monthlyFireSafetyEquipmentCheck: [],
      changeDate: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const monthlyFireSafetyEquipmentCheck = [];

    querySnapshot.forEach((res) => {
      const { monthly_fire_safety_date, monthly_fire_safety_is_completed } = res.data();
      monthlyFireSafetyEquipmentCheck.push({
        key: res.id,
        monthly_fire_safety_date,
        monthly_fire_safety_is_completed
      });
    });
    this.setState({
        monthlyFireSafetyEquipmentCheck,
        isLoading: false
    });
  }

  getMonday(date){
    var myDate = date.split("/");
    var newDate = myDate[2] + "/" + myDate[1] + "/" + myDate[0];
    var mondayDate = new Date(newDate);

    mondayDate.setDate(1);

    while (mondayDate.getDay() !== 1) {
      mondayDate.setDate(mondayDate.getDate() + 1);
    }

    var parsedDate = moment(mondayDate).format('D/M/YYYY')

    if (date !== parsedDate){
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (this.state.monthlyFireSafetyEquipmentCheck === undefined || this.state.monthlyFireSafetyEquipmentCheck.length == 0) {
      console.log("Error occurred: Monthly Safety Checks list returning undefined")
      return(
        <View></View>
      );
    } else {
        const newArray = this.state.monthlyFireSafetyEquipmentCheck.filter( x => 
          x.monthly_fire_safety_date == this.props.changeDate
        );

        if (newArray.length == 1){
          return (
            <ScrollView>
                {
                  this.state.monthlyFireSafetyEquipmentCheck.map((res, i) => {
                      if(this.getMonday(this.props.changeDate) && res.monthly_fire_safety_date == this.props.changeDate){
                          return (
                          <ListItem 
                              key={i}
                              onPress={() => {
                              this.props.navigation.navigate("MonthlyFireSafetyEquipmentCheck", {
                                  userkey: res.key
                              });
                              }}                        
                              bottomDivider>
                              <ListItem.Content>
                                  <ListItem.Title>Monthly Fire Safety Equipment Check</ListItem.Title>
                                  <ListItem.Subtitle>Is Completed: Yes</ListItem.Subtitle>
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
          );
        } else if (this.getMonday(this.props.changeDate)) {
          return (
            <ListItem 
                onPress={() => {
                this.props.navigation.navigate("AddMonthlyFireSafetyEquipmentList", {
                    changeDate: this.props.changeDate
                });
                }}  
                bottomDivider>
                <ListItem.Content>
                <ListItem.Title>Monthly Fire Safety Equipment Check</ListItem.Title>
                <ListItem.Subtitle>Is Completed: No</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                color="black" 
                />
            </ListItem>
          );
        } else {
          return(
            <View></View>
          );
        }
    }
  }
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})