import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
const styles = require("../../../Styles/general");

export default function Allergens({ route }) {
  const { additives_tags, allergens_tags } = route.params.item;

  function trimString(input) {
    return input.replace("en:", "");
  }

  return (
    <View>
      <Text style={styles.paddingCenter}>
        Allergens:
      </Text>
      {allergens_tags && allergens_tags.length > 0 ? (
        allergens_tags.map((allergen, id) => (
          <Text key={id} style={styles.title}>
            {trimString(allergen)}
          </Text>
        ))
      ) : (
        <Text>N/A</Text>
      )}
      <Text style={styles.paddingCenter}>
        Additives:
      </Text>
      {additives_tags && additives_tags.length > 0 ? (
        additives_tags.map((additive, id) => (
          <Text key={id} style={styles.title}>
            {trimString(additive)}
          </Text>
        ))
      ) : (
        <Text>N/A</Text>
      )}
    </View>
  );
}
