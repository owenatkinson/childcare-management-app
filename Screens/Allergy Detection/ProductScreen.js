import React, { useState } from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import General from "./Components/General";
import Ingredients from "./Components/Ingredients";
import Nutrition from "./Components/Nutrition";
import ChildAllergies from "./Components/ChildAllergies";

export default function ProductScreen({ route }) {
  const [selectedIndex, setIndex] = useState(0);
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
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          height: 50,
        }}
      />
      <View>
        {selectedIndex === 0 ? <General route={route} /> : false}
        {selectedIndex === 1 ? <Ingredients route={route} /> : false}
        {selectedIndex === 2 ? <Nutrition route={route} /> : false}
        {selectedIndex === 3 ? <ChildAllergies route={route} /> : false}
      </View>
    </View>
  );
}
