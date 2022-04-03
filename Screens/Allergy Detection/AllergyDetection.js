import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration } from "react-native";
import { Button } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
const styles = require("../../Styles/general");

export default function AllergyDetection({ navigation }) {
  // Initialising the state value of variables
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    // Seek permission to access the user's camera to enable bar code scanning
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const barcodeScan = ({ data }) => {
    // Set scanned variable as true
    setScanned(true);
    // Vibrate the device
    Vibration.vibrate();

    // Fetch product information from openfoodfacts api
    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then((response) => response.json())
      .then((json) => {
        // If a product is identified, navigate to the ProductScreen and include product info using item variable
        if (json.status_verbose === "product found") {
          navigation.navigate("ProductScreen", {
            item: json.product,
          });
        } else alert("Product not found");
      })
      // If an error occurs during this process, print an error
      .catch((error) => {
        console.error(error);
      });
  };

  // If hasPermission has not been specified, display this text 
  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  // If hasPermission is denied, display this text 
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.barCodeScan}>

      <BarCodeScanner
        // If scanned variable is false, run barcodeScan const
        onBarCodeScanned={scanned ? undefined : barcodeScan}
        style={StyleSheet.absoluteFillObject}
      />
      {/* While scanned variable is true, display this Button component */}
      {scanned && (
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          // When the Button is pressed, set scanned variable to false which allows barcodeScan const to run
          onPress={() => setScanned(false)}>
          <Text style={styles.buttonTextMenu}>Scan Barcode</Text>
        </Button>
      )}
    </View>
  );
}
