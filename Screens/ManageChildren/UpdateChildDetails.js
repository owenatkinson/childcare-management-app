import React, { Component } from 'react';
import { Button, View } from 'react-native';


class UpdateChildDetails extends Component {
    render() {
        return (
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Button
              title="Update Child Details"
              onPress={() => this.props.navigation.navigate('UpdateChildDetails')}
              color="#5219ac"
            />
          </View>
        );
    }  
}

export default UpdateChildDetails;