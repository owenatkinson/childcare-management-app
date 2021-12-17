import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import app from './firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

class LoadChildren extends Component {
  constructor() {
    super();
    this.docs = app.firestore().collection('children');
    this.state = {
      isLoading: true,
      children: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const children = [];
    querySnapshot.forEach((res) => {
      const { child_forename, child_surname, child_is_active } = res.data();
      children.push({
        key: res.id,
        child_forename,
        child_surname,
        child_is_active
      });
    });
    this.setState({
      children,
      isLoading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.children.map((res, i) => {
              return (
                <ListItem 
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateChildDetails", {
                      userkey: res.key
                    });
                  }}                        
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{res.child_forename} {res.child_surname}</ListItem.Title>
                    <ListItem.Subtitle>Active: {res.child_is_active}</ListItem.Subtitle>
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

export default LoadChildren;