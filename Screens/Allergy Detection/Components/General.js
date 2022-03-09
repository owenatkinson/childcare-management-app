import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { globalStyles } from "../Styles/global";
import { Entypo } from "@expo/vector-icons";

export default function General({ route }) {

  const { product_name, image_front_url, quantity, nutrient_levels } = route.params.item;
  
    return (
      <View style={globalStyles.productContainer}>
        <View style={styles.space}></View>
        <Text style={styles.textBold}>{ product_name? `${product_name}` : '' }</Text>
        <View style={styles.space}></View>
        <Text style={styles.text}>{ quantity? `Quantity: ${quantity}` : 'Quantity: N/A' }</Text>
        <View style={styles.space}></View>
        <Image
          source={{ uri: image_front_url }}
          style={styles.image}
        />
        <View style={styles.space}></View>
        {nutrient_levels.sugars != null && (
        <Text>
          <Text style={styles.text}>Sugar Levels: </Text>
          <Text style={styles.textBold}>{ nutrient_levels.sugars? `${nutrient_levels.sugars}` : '' }</Text>
          <Text>
            {nutrient_levels.sugars == 'low' ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
            ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
            )}
          </Text>
        </Text>
        )}
        <View style={styles.space}></View>
        {nutrient_levels.salt != null && (
        <Text>
          <Text style={styles.text}>Salt Levels: </Text>
          <Text style={styles.textBold}>{ nutrient_levels.salt? `${nutrient_levels.salt}` : '' }</Text>
          <Text>
            {nutrient_levels.salt == 'low' ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
            ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
            )}
          </Text>
        </Text>
        )}
        <View style={styles.space}></View>
        {nutrient_levels.fat != null && (
        <Text>
          <Text style={styles.text}>Fat Levels: </Text>
          <Text style={styles.textBold}>{ nutrient_levels.fat ? `${nutrient_levels.fat}` : '' }</Text>
          <Text>
            {nutrient_levels.fat == 'low' ? (
                <Entypo name={"dot-single"} size={40} color="#209E53" />
            ) : (
                <Entypo name={"dot-single"} size={40} color="#FF0000" />
            )}
          </Text>
        </Text>
        )}
        <View style={styles.space}></View>
        <View>
          {nutrient_levels['saturated-fat'] != null && (
          <Text>
            <Text style={styles.text}>Saturated Fat Levels: </Text>
            <Text style={styles.textBold}>{ nutrient_levels['saturated-fat'] ? `${nutrient_levels['saturated-fat']}` : '' }</Text>
            <Text>
              {nutrient_levels['saturated-fat'] == 'low' ? (
                  <Entypo style={styles.stylex} name={"dot-single"} size={40} color="#209E53" />
              ) : (
                  <Entypo name={"dot-single"} size={40} color="#FF0000" />
              )}
            </Text>
          </Text>
          )}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    space: {
      height: 20,
    },
    textBold: {
      fontSize: 20,
      fontWeight: 'bold',
      alignContent: 'center'
    },
    text: {
      fontSize: 18,
      alignContent: 'center'
    },
    image: {
      flex: 0, 
      width: 350, 
      height: 200
    },
    stylex: {
      paddingTop:10
    }
  });