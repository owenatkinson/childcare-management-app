import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B64A9',
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  }
});

export default Title;