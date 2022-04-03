import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
const styles = require("../../../Styles/general");
import app from "../../../Components/firebase";
import { trimAllergyString } from "../../../Components/Functionality";

// route paramater passed from ProductScreen includes product info
export default function ChildAllergies({ route }) {
  // Store allergen and ingredient information from product info
  const { allergens_tags, ingredients_text } = route.params.item;
  // Initialising the state value of childNameArr variable
  const [childNameArr, setChildNameArr] = useState([]);
  let childArr = [];

  useEffect(() => {
    const childNames = [];
    let index = 0;

    // Query the database for all children actively in care and store their name and allergies in childNames array
    app
      .firestore()
      .collection("children")
      .where("child_is_active", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          childNames.push({
            key: index++,
            name: document.data()["child_name"],
            allergies: document.data()["child_allergies"],
          });
        });
        setChildNameArr(childNames);
      });    
  }, []);

  // Add name to childArr array
  function addToArr(name){
    childArr.push(name);
  }

  // Remove duplicate names from the array
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
        // For each allergy within the scanned product
        allergens_tags.map((allergen) => (
            // For each child within childNameArr
            childNameArr.map(child => (
                // If the child's allergy is contained within the product, add the child's name to childArr
                child.allergies.toLowerCase().includes(trimAllergyString(allergen)) ? (addToArr(child.name)) : null )
            )
        ))
      ) : (
        <Text style={styles.title}>Information Unavailable</Text>
      )}

      {removeDuplicates()}
      
      {/* For each child's name in childArr, display it in a Text element */}
      {childArr.map((child) => (
        <Text style={styles.productName}>
            {child}
        </Text>
        ))}
    </View>
  );
}
