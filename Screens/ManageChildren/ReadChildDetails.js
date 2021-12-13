import React, { Component } from 'react';
import { Button, View } from 'react-native';


class ReadChildDetails extends Component {
    render() {
        return (
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Button
              title="Read Child Details"
              onPress={() => this.props.navigation.navigate('ReadChildDetails')}
              color="#5219ac"
            />
          </View>
        );
    }  
}

export default ReadChildDetails;