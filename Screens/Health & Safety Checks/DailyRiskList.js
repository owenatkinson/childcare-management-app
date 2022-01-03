import React, {Component} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import { ListItem } from 'react-native-elements';

export default class DailyRiskList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('dailyRiskAssessment');
    this.state = {
      isLoading: true,
      dailyRiskAssessment: [],
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
    const dailyRiskAssessment = [];

    querySnapshot.forEach((res) => {
      const { daily_risk_assessment_date, daily_risk_assessment_is_completed } = res.data();
      dailyRiskAssessment.push({
        key: res.id,
        daily_risk_assessment_date,
        daily_risk_assessment_is_completed
      });
    });
    this.setState({
        dailyRiskAssessment,
      isLoading: false
    });
  }

  render() {
    return (
      <ScrollView>
          {
            this.state.dailyRiskAssessment.map((res, i) => {
                if(res.daily_risk_assessment_date == this.props.changeDate){
                    return (
                    <ListItem 
                        key={i}
                        onPress={() => {
                        this.props.navigation.navigate("DailyRiskAssessment", {
                            userkey: res.key
                        });
                        }}                        
                        bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Daily Risk Assessment</ListItem.Title>
                            <ListItem.Subtitle>Date: {res.daily_risk_assessment_date}, Is Completed: {res.daily_risk_assessment_is_completed}</ListItem.Subtitle>
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