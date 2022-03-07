import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { globalStyles } from '../Styles/global';

export default function Allergens({ route }) {

  const { additives_tags, allergens_tags } = route.params.item;

  function trimString(input){
    return(input.replace('en:', ''));
  }

  return (
    <View style={globalStyles.productContainer}>
      <Text style={globalStyles.paddingCenter} h1>Allergens:</Text>
      { allergens_tags && allergens_tags.length > 0? allergens_tags.map( (allergen, id) => <Text key={id} style={{ fontSize : 16}} >{trimString(allergen)}</Text> ) : <Text h4>N/A</Text> }
      <Text style={globalStyles.paddingCenter} h1>Additives:</Text>
      { additives_tags && additives_tags.length > 0? additives_tags.map( (additive, id) => <Text key={id} style={{ fontSize : 16}} >{trimString(additive)}</Text> ) : <Text h4>N/A</Text> }
    </View>
  );
}