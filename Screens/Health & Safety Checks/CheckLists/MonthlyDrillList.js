import React, {Component} from 'react';
import { ScrollView, View } from 'react-native';
import app from '../../../Components/firebase';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

export default class MonthlyDrillList extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('monthlyFireDrill');
    this.state = {
      isLoading: true,
      monthlyFireDrill: [],
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
    const monthlyFireDrill = [];

    querySnapshot.forEach((res) => {
      const { monthly_fire_drill_date, monthly_fire_drill_is_completed } = res.data();
      monthlyFireDrill.push({
        key: res.id,
        monthly_fire_drill_date,
        monthly_fire_drill_is_completed
      });
    });
    this.setState({
        monthlyFireDrill,
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
    if (this.state.monthlyFireDrill === undefined || this.state.monthlyFireDrill.length == 0) {
      return(
        <View></View>
      );
    } else {
      const newArray = this.state.monthlyFireDrill.filter( x => 
        x.monthly_fire_drill_date == this.props.changeDate
      );
      if (newArray.length == 1){
        return (
          <ScrollView>
              {
                this.state.monthlyFireDrill.map((res, i) => {
                    if(res.monthly_fire_drill_date == this.props.changeDate){
                        return (
                        <ListItem 
                            key={i}
                            onPress={() => {
                            this.props.navigation.navigate("MonthlyFireDrill", {
                                userkey: res.key
                            });
                            }}                        
                            bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Monthly Fire Drill</ListItem.Title>
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
              this.props.navigation.navigate("AddMonthlyDrillList", {
                  changeDate: this.props.changeDate
              });
              }}  
              bottomDivider>
              <ListItem.Content>
              <ListItem.Title>Monthly Fire Drill</ListItem.Title>
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