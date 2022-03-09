import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#DADADA'
    },
    extendedInput: {
        backgroundColor: '#DADADA',
        padding: 10,
        borderWidth: 1,
        margin: 12,
        textAlignVertical: 'top'
    },
    bold: {
        fontWeight: 'bold',
        marginLeft: 12,
        marginTop: 15
    },
    boldCentreText: {
        marginTop: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    boldLargeText: {
        fontWeight: 'bold',
        marginLeft: 12,
        marginTop: 15,
        fontSize: 18
    },
    boldTextCheckbox: {
        fontWeight: 'bold',
        marginLeft: 12,
        marginTop: 20
    },
    standard: {
        padding: 10,
        marginLeft: 12,
        marginTop: 5
    },
    space: {
        height: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: '#ee752e',
        margin: 12,
        padding: 10,
        height: 40
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    dropdown: {
        margin: 12,
        backgroundColor: '#ee752e',
        color: '#FFFFFF',
    },
    dropdownBold: {
        margin: 12,
        backgroundColor: '#ee752e',
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: "center",
    },
    dropdownText: {
        margin: 12,
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: "center",
    },
    fixToText: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    wrapper: {
        flex: 1,
        paddingBottom: 20
    },
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
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        color: '#0B64A9',
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 18,
    }
});