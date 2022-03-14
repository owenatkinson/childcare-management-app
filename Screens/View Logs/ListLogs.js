import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import app from '../../Components/firebase';
import "firebase/firestore";
import { ListItem } from 'react-native-elements';

export default class ListLogs extends Component {
    constructor() {
        super();
        this.docs = app.firestore().collection("attendanceRegister").orderBy("child_name", "desc");
        this.state = {
        isLoading: true,
            logs: [],
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
        const logs = [];
        querySnapshot.forEach((res) => {
            const { child_name, date_of_attendance, check_in_time, check_out_time} = res.data();
            logs.push({
            key: res.id,
            child_name,
            date_of_attendance,
            check_in_time,
            check_out_time
            });
        });
        this.setState({
            logs,
            isLoading: false
        });
    }

  render() {
    return (
      <ScrollView>
          {
            this.state.logs.map((res, i) => {
                if(res.date_of_attendance == this.props.changeDate){
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
                            <ListItem.Subtitle>{res.check_in_time}-{res.check_out_time}</ListItem.Subtitle>
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