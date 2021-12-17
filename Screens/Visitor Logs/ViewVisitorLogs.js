import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

export default class ViewVisitorLogs extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('visitorLogs');
    this.state = {
      isLoading: true,
      visitorLogs: []
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
      isLoading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.visitorLogs.map((res, i) => {
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
                    <ListItem.Subtitle>Date of Visit: {res.date_of_visit}</ListItem.Subtitle>
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