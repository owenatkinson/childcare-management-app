import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
const styles = require("../../../Styles/general");
import app from "../../../Components/firebase";
import { trimAllergyString } from "../../../Components/Functionality";

export default function ChildAllergies({ route }) {
  const { allergens_tags, ingredients_text } = route.params.item;
  const [childNameArr, setChildNameArr] = useState([]);
  let childArr = [];

  useEffect(() => {
    const childNames = [];
    setChildNameArr([]);
    let index = 0;

    app
      .firestore()
      .collection("children")
      .orderBy("child_name", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          childNames.push({
            key: index++,
            name: doc.data()["child_name"],
            allergies: doc.data()["child_allergies"],
          });
        });
        setChildNameArr(childNames);
      });    
  }, []);

  function addToArr(name){
    childArr.push(name);
  }

  function removeDuplicates(){
    childArr = [...new Set(childArr)];
  }

  return (
    <View>
      <Text style={styles.paddingCenter}>
        Child Allergies
      </Text>
      <Text style={styles.productName}>
        This Product is unsuitable for:
      </Text>
      <View style={styles.space}></View>
      {ingredients_text ? (
        allergens_tags.map((allergen, id) => (
            childNameArr.map(child => (
                child.allergies.toLowerCase().includes(trimAllergyString(allergen)) ? (
                    addToArr(child.name),
                    null
                ) : (
                    null
                ))
            )
        ))
      ) : (
        <Text style={styles.title}>Information Unavailable</Text>
      )}

      {removeDuplicates()}
      
      {childArr.map((child) => (
        <Text style={styles.productName}>
            {child}
        </Text>
        ))}
    </View>
  );
}
