import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

export default class ViewLogs extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('attendanceRegister');
    this.state = {
      isLoading: true,
      logs: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const logs = [];
    querySnapshot.forEach((res) => {
      const { child_name, date_of_attendance, check_in_time, check_out_time, dropped_by, collected_by, temperature_checked, meals_, additional_notes} = res.data();
      logs.push({
        key: res.id,
        child_name,
        date_of_attendance,
        check_in_time,
        check_out_time,
        dropped_by,
        collected_by,
        temperature_checked,
        meals_,
        additional_notes
      });
    });
    this.setState({
      logs,
      isLoading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.logs.map((res, i) => {
              return (
                <ListItem 
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("ViewLogDetails", {
                      userkey: res.key
                    });
                  }}                        
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{res.child_name}</ListItem.Title>
                    <ListItem.Subtitle>Date: {res.date_of_attendance}</ListItem.Subtitle>
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
  }
}

const styles = StyleSheet.create({
    wrapper: {
     flex: 1,
     paddingBottom: 20
    },
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