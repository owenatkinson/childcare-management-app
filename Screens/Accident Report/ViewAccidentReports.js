import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

export default class ViewAccidentReports extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('accidentReports');
    this.state = {
      isLoading: true,
      accidentReports: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const accidentReports = [];
    querySnapshot.forEach((res) => {
      const { child_name, accident_date, accident_time, accident_notes } = res.data();
      accidentReports.push({
        key: res.id,
        child_name,
        accident_date,
        accident_time,
        accident_notes
      });
    });
    this.setState({
      accidentReports,
      isLoading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.accidentReports.map((res, i) => {
              return (
                <ListItem 
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateAccidentReport", {
                      userkey: res.key
                    });
                  }}                        
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{res.child_name}</ListItem.Title>
                    <ListItem.Subtitle>Date of Accident: {res.accident_date}</ListItem.Subtitle>
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