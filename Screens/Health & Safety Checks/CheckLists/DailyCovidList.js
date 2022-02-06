import React, {Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import app from '../../../firebase';
import { ListItem } from 'react-native-elements';

export default class DailyCovidList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('dailyCovidAssessment');
    this.state = {
      isLoading: true,
      dailyCovidAssessment: [],
      changeDate: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].daily_covid_assessment_date === nameKey) {
            return myArray[i];
        }
    }
  }

  fetchCollection = (querySnapshot) => {
    const dailyCovidAssessment = [];

    querySnapshot.forEach((res) => {
      const { daily_covid_assessment_date, daily_covid_assessment_is_completed } = res.data();
      dailyCovidAssessment.push({
        key: res.id,
        daily_covid_assessment_date,
        daily_covid_assessment_is_completed
      });
    });
    this.setState({
      dailyCovidAssessment,
      isLoading: false
    });
  }

  isWeekday(date){
    var myDate = date.split("/");
    var newDate = myDate[2] + "/" + myDate[1] + "/" + myDate[0];
    var weekendDate = new Date(newDate);

    if(weekendDate.getDay() == 0 || weekendDate.getDay() == 6){
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (this.state.dailyCovidAssessment === undefined || this.state.dailyCovidAssessment.length == 0 || !this.isWeekday(this.props.changeDate)) {
      return(
        <View></View>
      );
    } else {      
      const newArray = this.state.dailyCovidAssessment.filter( x => 
        x.daily_covid_assessment_date == this.props.changeDate
      );

      if (newArray.length == 1){
        return (
          <ScrollView>
              {
                // for each daily covid check
                newArray.map((res, i) =>  {
                    // if daily covid check has the selected date, display in row
                        return (
                          <ListItem 
                              key={i}
                              onPress={() => {
                              this.props.navigation.navigate("DailyCovidAssessment", {
                                  userkey: res.key
                              });
                              }}                        
                              bottomDivider>
                              <ListItem.Content>
                              <ListItem.Title>Daily COVID Assessment</ListItem.Title>
                              <ListItem.Subtitle>Is Completed: Yes</ListItem.Subtitle>
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
      } else {
        return (
          <ListItem 
              onPress={() => {
              this.props.navigation.navigate("AddDailyCovidAssessment", {
                  changeDate: this.props.changeDate
              });
              }}  
              bottomDivider>
              <ListItem.Content>
              <ListItem.Title>Daily COVID Assessment</ListItem.Title>
              <ListItem.Subtitle>Is Completed: No</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron 
              color="black" 
              />
          </ListItem>
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