import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#DADADA",
  },
  extendedInput: {
    backgroundColor: "#DADADA",
    padding: 10,
    borderWidth: 1,
    margin: 12,
    textAlignVertical: "top",
  },
  bold: {
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 15,
  },
  standardText: {
    marginLeft: 12,
  },
  boldCentreText: {
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  boldCentre: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  boldLargeText: {
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 15,
    fontSize: 18,
  },
  boldTextCheckbox: {
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 20,
  },
  standard: {
    padding: 10,
    marginLeft: 12,
    marginTop: 5,
  },
  space: {
    height: 20,
  },
  buttonSpace: {
    height: 60,
  },
  horizontalRule: {
    height: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ee752e",
    margin: 12,
    padding: 10,
    height: 40,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dropdown: {
    margin: 12,
    backgroundColor: "#ee752e",
    color: "#FFFFFF",
  },
  dropdownText: {
    margin: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
  },
  fitToText: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  barCodeScan: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    paddingBottom: 20,
  },
  imageView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
  },
  receiptImage: {
    width: 400,
    height: 700,
    resizeMode: "contain",
    borderColor: "#000000",
    borderWidth: 2,
  },
  foodItemImage: {
    flex: 0,
    width: 350,
    height: 200,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    color: "#0B64A9",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  paddedText: {
    fontSize: 18,
    paddingLeft: 15,
  },
  quantityText: {
    fontSize: 18,
    alignSelf: "center",
  },
  swipeableItem: {
    height: 55,
  },
  receiptPreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  checkBox: {
    marginTop: 15,
  },
  checkBoxAlignRight: {
    marginTop: 15,
    marginLeft: "auto",
    marginRight: 5,
  },
  checkBoxPositioning: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleHeader: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ee752e",
  },
  paddingCenter: {
    fontSize: 40,
    padding: 30,
    alignSelf: "center",
    fontWeight: "bold"
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  allNutrients: {
    flexDirection: "row",
  },
  nutrientsDot: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  ingredientsList: {
    padding: 30,
    alignItems: "center",
    fontSize: 20,
  },
  inlineDisplay: {
    flexDirection: "row",
  },
  icons: {
    marginLeft: 5,
  },
  nutritionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  nutritionDetail: {
    fontSize: 20,
    marginLeft: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
});
