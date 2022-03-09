import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
const styles = require('./Styles/general');

const date = moment().format('dddd Do MMMM YYYY');

const Date = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{date}</Text>
    </View>
  );
}

export default Date;