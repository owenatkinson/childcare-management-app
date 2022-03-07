import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { globalStyles } from '../Styles/global'

export default function Ingredients({ route }) {

  const { ingredients_text } = route.params.item;
    return (
      
      <View style={globalStyles.productContainer}>
        <Text style={globalStyles.paddingCenterPetit}>{ ingredients_text? ingredients_text : 'N/A' }</Text>
        </View>
    );
  }