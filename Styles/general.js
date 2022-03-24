import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#DADADA",
    color: "#02314D",
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
    color: "#02314D",
  },
  standardText: {
    marginLeft: 12,
  },
  boldCentreText: {
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20
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
  submitButtonSpace: {
    height: 40,
  },
  horizontalRule: {
    height: 20,
    borderBottomColor: "#02314D",
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#02314D",
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
    backgroundColor: "#02314D",
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
    color: "#02314D",
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
    backgroundColor: "#EE752E",
  },
  paddingCenter: {
    fontSize: 40,
    paddingTop: 30,
    paddingHorizontal: 30,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#02314D",
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15,
    color: "#02314D",
  },
  productName: {
    fontSize: 22,
    paddingHorizontal: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#02314D",
  },
  productHeader: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#02314D",
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
    paddingTop: 30,
    paddingHorizontal: 30,
    alignSelf: "center",
    fontSize: 18,
    color: "#02314D",
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
    color: "#02314D",
  },
  nutritionDetail: {
    fontSize: 20,
    marginLeft: 12,
    color: "#02314D",
  },
  navyStandardText: {
    color: "#02314D",
  },
  navyTextWithLeftMargin: {
    fontSize: 18,
    color: "#02314D",
    marginLeft: 12,
  },
  navyBoldText: {
    color: "#02314D",
    fontWeight: 'bold'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  boldBlueText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#0B64A9"
  },
  phoneIcon: {
    marginRight: 15,
  },
  iconPadding: {
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  alignItemsCenter:{
    alignItems: "center"
  },
  menuShapes: {
    marginVertical: 15,
    marginHorizontal: 40,
    backgroundColor: "#DADADA",
    width: 90,
    height: 90,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  menuImage: {
    height: 50,
    width: 50
  },
  menuTitle: {
    marginBottom: 10,
    justifyContent: "center"
  },
  menuBackground: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: "#696969",
    fontWeight: "bold",
    color: "#02314D"
  },
  buttonTextMenu: {
    color: "#FFFFFF",
    fontSize: 17,
    alignSelf: "center"
  },
});
