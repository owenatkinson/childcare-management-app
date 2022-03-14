import React from 'react';
import { View, Image } from 'react-native';
const styles = require('../../Styles/general');

const ReceiptPreview = ({route}) => {
    return(
        <View style={styles.imageView}>
            <Image source={{ uri: route.params.receiptImage }} style={styles.receiptImage} />
        </View>
    );
}

export default ReceiptPreview;