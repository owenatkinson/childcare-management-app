import React, { useState } from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import General from "./Components/General";
import Ingredients from "./Components/Ingredients";
import Nutrition from "./Components/Nutrition";
import ChildAllergies from "./Components/ChildAllergies";

export default function ProductScreen({ route }) {
  // Initialising the state value of index variable
  const [index, setIndex] = useState(0);
  // Array used to populate ButtonGroup
  const buttons = [
    "General",
    "Ingredients",
    "Nutrition",
    "Children",
  ];

  return (
    <View>
      <ButtonGroup
        onPress={setIndex}
        index={index}
        buttons={buttons}
      />
      <View>
        {index === 0 ? <General route={route} /> : false}
        {index === 1 ? <Ingredients route={route} /> : false}
        {index === 2 ? <Nutrition route={route} /> : false}
        {index === 3 ? <ChildAllergies route={route} /> : false}
      </View>
    </View>
  );
}
