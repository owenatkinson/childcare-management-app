import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
const styles = require("../../../Styles/general");

// route paramater passed from ProductScreen includes product info
export default function Nutrition({ route }) {
  // Store nutrient infor from product scanned
  const { nutriments } = route.params.item;
  return (
    <View>
      <View style={styles.space}></View>
      <Text style={styles.nutritionText}>Per 100g:</Text>
      <View style={styles.space}></View>
      {/* If calorie info is available, display it in Text component */}
      {nutriments["energy-kcal_100g"] != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"fire"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Calories:</Text>
            <Text style={styles.nutritionDetail}>
              {nutriments["energy-kcal_100g"]}kcal
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If fat info is available, display it in Text component */}
      {nutriments.fat_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialIcons
            name={"grain"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Fat:</Text>
            <Text style={styles.nutritionDetail}>{nutriments.fat_100g}g</Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If saturated fat info is available, display it in Text component */}
      {nutriments["saturated-fat_100g"] != null && (
        <View style={styles.allNutrients}>
          <SimpleLineIcons
            name={"drop"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Saturated Fat:</Text>
            <Text style={styles.nutritionDetail}>
              {nutriments["saturated-fat_100g"]}g
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If carbohydrate info is available, display it in Text component */}
      {nutriments.carbohydrates_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"corn"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Carbohydrate:</Text>
            <Text style={styles.nutritionDetail}>
              {nutriments.carbohydrates_100g}g
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If sugar info is available, display it in Text component */}
      {nutriments.sugars_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"spoon-sugar"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Sugar:</Text>
            <Text style={styles.nutritionDetail}>
              {nutriments.sugars_100g}g
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If fibre info is available, display it in Text component */}
      {nutriments.fiber_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"corn"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Fibre:</Text>
            <Text style={styles.nutritionDetail}>{nutriments.fiber_100g}g</Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If protein info is available, display it in Text component */}
      {nutriments.proteins_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"cow"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Protein:</Text>
            <Text style={styles.nutritionDetail}>
              {nutriments.proteins_100g}g
            </Text>
          </View>
        </View>
      )}
      <View style={styles.space}></View>
      {/* If salt info is available, display it in Text component */}
      {nutriments.salt_100g != null && (
        <View style={styles.allNutrients}>
          <MaterialCommunityIcons
            name={"cube-outline"}
            size={30}
            color="#02314D"
            style={styles.icons}
          />
          <View style={styles.inlineDisplay}>
            <Text style={styles.nutritionText}>Salt:</Text>
            <Text style={styles.nutritionDetail}>{nutriments.salt_100g}g</Text>
          </View>
        </View>
      )}
    </View>
  );
}
