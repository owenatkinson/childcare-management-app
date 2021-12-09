import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const date = moment().format('dddd Do MMMM YYYY');

const Date = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    title: {
      color: '#0B64A9',
      fontWeight: 'bold',
      textAlign: "center",
      fontSize: 18,
    }
  });

export default Date;