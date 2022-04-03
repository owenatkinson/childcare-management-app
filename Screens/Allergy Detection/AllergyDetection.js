import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration } from "react-native";
import { Button } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
const styles = require("../../Styles/general");

export default function AllergyDetection({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const barcodeScan = ({ data }) => {
    setScanned(true);
    Vibration.vibrate();

    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status_verbose === "product found") {
          navigation.navigate("ProductScreen", {
            item: json.product,
          });
        } else alert("Product not found");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.barCodeScan}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : barcodeScan}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => setScanned(false)}>
          <Text style={styles.buttonTextMenu}>Scan Barcode</Text>
        </Button>
      )}
    </View>
  );
}
