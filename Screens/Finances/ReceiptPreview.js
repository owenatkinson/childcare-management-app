import React from "react";
import { View, Image } from "react-native";
const styles = require("../../Styles/general");

const ReceiptPreview = ({ route }) => {
  return (
    <View style={styles.imageView}>
      {/* Displays the receipt image in full screen, using the passed receiptUrl */}
      <Image
        source={{ uri: route.params.receiptImage }}
        style={styles.receiptImage}
      />
    </View>
  );
};

export default ReceiptPreview;
