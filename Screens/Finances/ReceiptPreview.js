import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const ReceiptPreview = ({route}) => {
    return(
        <View style={styles.imageView}>
            <Image source={{ uri: route.params.receiptImage }} style={styles.image} />
            {/* <Button title='Delete'></Button> */}
        </View>
    );
}

const styles = StyleSheet.create({
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#696969'
    },
    image: {
        width: 400, 
        height: 700, 
        resizeMode: 'contain',
        borderColor: '#000000',
        borderWidth: 2
    }
})

export default ReceiptPreview;