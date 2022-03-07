import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import {productDefaults } from '../Styles/ProductDefaults'

export default function Nutrition({ route }) {

    const { nutriments } = route.params.item;

    return (

        <View>
            <View style={styles.space}></View>
            <Text style={styles.boldText}>Per 100g:</Text>
            <View style={styles.space}></View>
            {nutriments['energy-kcal_100g'] != null && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"fire"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Calories:</Text>
                        <Text style={styles.text}>{nutriments['energy-kcal_100g']}g</Text>
                    </View>
                </View>
            )}

            <View style={styles.space}></View>

            {nutriments.fat_100g != null && (
                <View style={productDefaults.allNutriments}>
                    <MaterialIcons
                        name={"grain"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Fat:</Text>
                        <Text style={styles.text}>{nutriments.fat_100g}g</Text>
                    </View>
                </View>
            )}

            <View style={styles.space}></View>

            {nutriments['saturated-fat_100g'] != null && (
                <View style={productDefaults.allNutriments}>
                    <SimpleLineIcons
                        name={"drop"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Saturated Fat:</Text>
                        <Text style={styles.text}>{nutriments['saturated-fat_100g']}g</Text>
                    </View>
                </View>
            )}

            <View style={styles.space}></View>

            {nutriments.carbohydrates_100g != null && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"corn"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Carbohydrate:</Text>
                        <Text style={styles.text}>{nutriments.carbohydrates_100g}g</Text>
                    </View>
                </View>
            )}

            <View style={styles.space}></View>

            {nutriments.sugars_100g != null && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"spoon-sugar"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Sugar:</Text>
                        <Text style={styles.text}>{nutriments.sugars_100g}g</Text>
                    </View>
                </View>
            )}

            <View style={styles.space}></View>

            {nutriments.fiber_100g != null && (
            <View style={productDefaults.allNutriments}>
                <MaterialCommunityIcons
                    name={"corn"}
                    size={30}
                    color="#787878"
                    style={productDefaults.icons}
                />
                <View style={styles.inlineDisplay}>
                    <Text style={styles.boldText}>Fibre:</Text>
                    <Text style={styles.text}>{nutriments.fiber_100g}g</Text>
                </View>
            </View>
            )}

            <View style={styles.space}></View>

            {nutriments.proteins_100g != null && (                
            <View style={productDefaults.allNutriments}>
                <MaterialCommunityIcons
                    name={"cow"}
                    size={30}
                    color="#787878"
                    style={productDefaults.icons}
                />
                <View style={styles.inlineDisplay}>
                    <Text style={styles.boldText}>Protein:</Text>
                    <Text style={styles.text}>{nutriments.proteins_100g}g</Text>
                </View>
            </View>
            )}

            <View style={styles.space}></View>   

            {nutriments.salt_100g != null && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"cube-outline"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={styles.inlineDisplay}>
                        <Text style={styles.boldText}>Salt:</Text>
                        <Text style={styles.text}>{nutriments.salt_100g}g</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    space: {
        height: 20,
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 12
    },
    text: {
        fontSize: 20,
        marginLeft: 12
    },
    inlineDisplay: {
        flexDirection: "row"
    },
    image: {
        flex: 0, 
        width: 350, 
        height: 200
    }
});