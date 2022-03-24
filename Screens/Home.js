import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
const styles = require("../Styles/general");

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, name: "Accidents", title: "AccidentReports", image:"https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-plaster-medical-and-health-itim2101-lineal-color-itim2101.png"},
        {id:2, name: "Attendance", title: "Attendance", image:"https://img.icons8.com/glyph-neue/64/000000/attendance-mark.png"},
        {id:3, name: "Allergies", title: "Allergy", image:"https://img.icons8.com/external-colored-outline-lafs/64/000000/external-allergy-stop-virus-outline-colored-iconset-part-3-colored-outline-lafs.png"} ,
        {id:4, name: "Contacts", title: "ViewEmergencyContacts", image:"https://img.icons8.com/flat-round/64/000000/phone.png"} ,
        {id:5, name: "Finances", title: "Finances", image:"https://img.icons8.com/external-kmg-design-outline-color-kmg-design/64/000000/external-pounds-money-kmg-design-outline-color-kmg-design.png"} ,
        {id:6, name: "Health & Safety", title: "HealthSafetyChecks", image:"https://img.icons8.com/color/96/000000/heart-health.png"} ,
        {id:7, name: "My Children", title: "ManageChildren", image:"https://img.icons8.com/fluency/96/000000/children.png"} ,
        {id:8, name: "Medicine", title: "MedicineAdministration", image:"https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-medicine-medical-icongeek26-linear-colour-icongeek26.png"} ,
        {id:9, name: "Policies", title: "Policies", image:"https://img.icons8.com/fluency/96/000000/documents.png"} ,
        {id:10, name: "Visitors", title: "VisitorLogs",image:"https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-visitors-hospitality-services-flaticons-flat-flat-icons.png"} ,
      ]
    };
  }

  render() {
    return (
      <View style={styles.menuBackground}>
        <FlatList
          contentContainerStyle={styles.alignItemsCenter}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={styles.menuShapes} onPress={() => this.props.navigation.navigate(item.title)}>
                  <Image style={styles.menuImage} source={{uri:item.image}}/>
                </TouchableOpacity>

                <View style={styles.menuTitle}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.menuText}>{item.name}</Text>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}
