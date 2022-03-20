import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
const styles = require("../../../Styles/general");
import { trimAllergyString } from "../../../Components/Functionality";

export default function Allergens({ route }) {
  const { additives_tags, allergens_tags } = route.params.item;

  return (
    <View>
      <Text style={styles.paddingCenter}>
        Allergens:
      </Text>
      {allergens_tags && allergens_tags.length > 0 ? (
        allergens_tags.map((allergen, id) => (
          <Text key={id} style={styles.productName}>
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
          <Text key={id} style={styles.productName}>
            {trimAllergyString(additive)}
          </Text>
        ))
      ) : (
        <Text style={styles.title}>Information Unavailable</Text>
      )}
    </View>
  );
}
