import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// import AddNewChildButton from '../../AddButton';
import "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';

function ManageChildren({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.fixToText}>
        <Button
          title="Add New Child"
          onPress={() => navigation.navigate('AddNewChild')}
        />
        <View style={styles.space}></View>
        <Button
          title="View Children"
          onPress={() => navigation.navigate('ViewChildren')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, space: {
    height: 38,
  }
})

export default ManageChildren;