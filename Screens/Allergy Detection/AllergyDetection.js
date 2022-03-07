import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AllergyDetection({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ _, data }) => {
    setScanned(true);
    Vibration.vibrate()

    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status_verbose === 'product found'){
          navigation.navigate('ProductScreen',
          {
            item: json.product
          })
        }
        else alert('Product not found')

      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Scan code'} onPress={() => setScanned(false)} />}
    </View>
  );
}