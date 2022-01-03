import React, {Component} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
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

  render() {
    return (
      <ScrollView>
          {
            this.state.dailyCovidAssessment.map((res, i) => {
                if(res.daily_covid_assessment_date == this.props.changeDate){
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
                        <ListItem.Subtitle>Date: {res.daily_covid_assessment_date}, Is Completed: {res.daily_covid_assessment_is_completed}</ListItem.Subtitle>
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