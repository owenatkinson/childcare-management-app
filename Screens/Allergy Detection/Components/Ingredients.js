import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { trimAllergyString } from "../../../Components/Functionality";
const styles = require("../../../Styles/general");

export default function Ingredients({ route }) {
  const { additives_tags, allergens_tags, ingredients_text } = route.params.item;
  return (
    <View>
      <Text style={styles.ingredientsList}>
        {ingredients_text ? ingredients_text : "Information Unavailable"}
      </Text>
      <Text style={styles.paddingCenter}>
        Allergens:
      </Text>
      {allergens_tags && allergens_tags.length > 0 ? (
        allergens_tags.map((allergen, id) => (
          <Text key={id} style={styles.productHeader}>
            {trimAllergyString(allergen)}
          </Text>
        ))
      ) : (
        <Text style={styles.title}>Information Unavailable</Text>
      )}
      <Text style={styles.paddingCenter}>
        Additives:
      </Text>
      {additives_tags && additives_tags.length > 0 ? (
        additives_tags.map((additive, id) => (
          <Text key={id} style={styles.productHeader}>
            {trimAllergyString(additive)}
          </Text>
        ))
      ) : (
        <Text style={styles.title}>Information Unavailable</Text>
      )}
    </View>
  );
}
