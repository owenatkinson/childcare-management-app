import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
const styles = require("../../../Styles/general");

export default function General({ route }) {
  const { product_name, image_front_url, nutrient_levels } = route.params.item;

  return (
    <View>
      <View style={styles.space}></View>
      <Text style={styles.productName}>
        {product_name ? `${product_name}` : null}
      </Text>
      <View style={styles.space}></View>
      <Image source={{ uri: image_front_url }} style={styles.foodItemImage} />

      <View style={styles.buttonSpace}></View>

      {nutrient_levels.sugars != null && (
        <View style={styles.allNutrients}>
          <View>
            <Text style={styles.paddedText}>Sugar Levels: </Text>
            <Text style={styles.textBold}>
              {nutrient_levels.sugars ? `${nutrient_levels.sugars}`.toUpperCase() : null}
            </Text>
          </View>
          <View style={styles.nutrientsDot}>
            <Text>
              {nutrient_levels.sugars == "low" ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
              ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
              )}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.space}></View>
      {nutrient_levels.salt != null && (
        <View style={styles.allNutrients}>
          <View>
            <Text style={styles.paddedText}>Salt Levels: </Text>
            <Text style={styles.textBold}>
              {nutrient_levels.salt ? `${nutrient_levels.salt}`.toUpperCase() : null}
            </Text>
          </View>
          <View style={styles.nutrientsDot}>
            <Text>
              {nutrient_levels.salt == "low" ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
              ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
              )}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {nutrient_levels.fat != null && (
        <View style={styles.allNutrients}>
          <View>
            <Text style={styles.paddedText}>Fat Levels: </Text>
            <Text style={styles.textBold}>
              {nutrient_levels.fat ? `${nutrient_levels.fat}`.toUpperCase() : null}
            </Text>
          </View>
          <View style={styles.nutrientsDot}>
            <Text>
              {nutrient_levels.fat == "low" ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
              ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
              )}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.space}></View>
      {nutrient_levels["saturated-fat"] != null && (
        <View style={styles.allNutrients}>
          <View>
            <Text style={styles.paddedText}>Saturated Fat Levels: </Text>
            <Text style={styles.textBold}>
              {nutrient_levels["saturated-fat"]
                ? `${nutrient_levels["saturated-fat"]}`.toUpperCase()
                : null}
            </Text>
          </View>
          <View style={styles.nutrientsDot}>
            <Text>
              {nutrient_levels["saturated-fat"] == "low" ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
              ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
              )}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
