import React, {Component} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import { ListItem } from 'react-native-elements';

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

  render() {
    return (
      <ScrollView>
          {
            this.state.monthlyFireSafetyEquipmentCheck.map((res, i) => {
                if(res.monthly_fire_safety_date == this.props.changeDate){
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
                            <ListItem.Subtitle>Is Completed: {res.monthly_fire_safety_is_completed}</ListItem.Subtitle>
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