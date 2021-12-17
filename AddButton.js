import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

function AddNewChildButton({ navigation }) {
    return(
        <FAB
            style={styles.fab}
            icon="plus"
            color="#FFFFFF"
            onPress={() => navigation.navigate('AddNewChild')}
        />
    );
}

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    backgroundColor: "#EE752E",
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'auto',
    marginRight:'auto'
  },
})

export default AddNewChildButton;