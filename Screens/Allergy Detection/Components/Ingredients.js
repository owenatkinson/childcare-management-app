import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
const styles = require('../../../Styles/general');

export default function Ingredients({ route }) {
  const { ingredients_text } = route.params.item;
  return (
    <View>
      <Text style={styles.ingredientsList}>{ ingredients_text? ingredients_text : 'N/A' }</Text>
      </View>
  );
}