import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import app from "../../Components/firebase";
import "firebase/firestore";
const styles = require("../../Styles/general");

export default class DailyRiskAssessment extends Component {
  // Initialising the state value of variables
  constructor() {
    super();
    this.state = {
      dailyRiskAssessmentDate: "",
      dailyRiskAssessmentIsCompleted: "",
      dailyRiskAssessmentNote: "",
      dailyRiskAssessmentCheck1: "",
      dailyRiskAssessmentCheck2: "",
      dailyRiskAssessmentCheck3: "",
      dailyRiskAssessmentCheck4: "",
      dailyRiskAssessmentCheck5: "",
      dailyRiskAssessmentCheck6: "",
      dailyRiskAssessmentCheck7: "",
      dailyRiskAssessmentCheck8: "",
      dailyRiskAssessmentCheck9: "",
      dailyRiskAssessmentCheck10: "",
      dailyRiskAssessmentCheck11: "",
      dailyRiskAssessmentCheck12: "",
      dailyRiskAssessmentCheck13: "",
      dailyRiskAssessmentCheck14: "",
      dailyRiskAssessmentCheck15: "",
      dailyRiskAssessmentCheck16: "",
      dailyRiskAssessmentCheck17: "",
      dailyRiskAssessmentCheck18: "",
      dailyRiskAssessmentCheck19: "",
      dailyRiskAssessmentCheck20: "",
      dailyRiskAssessmentCheck21: "",
      dailyRiskAssessmentCheck22: "",
      dailyRiskAssessmentCheck23: "",
      dailyRiskAssessmentCheck24: "",
      dailyRiskAssessmentCheck25: "",
      dailyRiskAssessmentCheck26: "",
      dailyRiskAssessmentCheck27: "",
      dailyRiskAssessmentCheck28: "",
      dailyRiskAssessmentCheck29: "",
      dailyRiskAssessmentCheck30: "",
      dailyRiskAssessmentCheck31: "",
      dailyRiskAssessmentCheck32: "",
      dailyRiskAssessmentCheck33: "",
      dailyRiskAssessmentCheck34: "",
    };
  }

  componentDidMount() {
    // Query the database to gather monthly fire drill data, using userkey as an identifier
    const documentReference = app
      .firestore()
      .collection("dailyRiskAssessment")
      .doc(this.props.route.params.userkey);
    // Once the database query has retrieved results, assign them to state variable values
    documentReference.get().then((result) => {
      if (result.exists) {
        const data = result.data();
        this.setState({
          key: result.id,
          dailyRiskAssessmentDate: data.daily_risk_assessment_date,
          dailyRiskAssessmentIsCompleted: data.daily_risk_assessment_is_completed,
          dailyRiskAssessmentNote: data.daily_risk_assessment_note,
          dailyRiskAssessmentCheck1: data.daily_risk_assessment_check_1,
          dailyRiskAssessmentCheck2: data.daily_risk_assessment_check_2,
          dailyRiskAssessmentCheck3: data.daily_risk_assessment_check_3,
          dailyRiskAssessmentCheck4: data.daily_risk_assessment_check_4,
          dailyRiskAssessmentCheck5: data.daily_risk_assessment_check_5,
          dailyRiskAssessmentCheck6: data.daily_risk_assessment_check_6,
          dailyRiskAssessmentCheck7: data.daily_risk_assessment_check_7,
          dailyRiskAssessmentCheck8: data.daily_risk_assessment_check_8,
          dailyRiskAssessmentCheck9: data.daily_risk_assessment_check_9,
          dailyRiskAssessmentCheck10: data.daily_risk_assessment_check_10,
          dailyRiskAssessmentCheck11: data.daily_risk_assessment_check_11,
          dailyRiskAssessmentCheck12: data.daily_risk_assessment_check_12,
          dailyRiskAssessmentCheck13: data.daily_risk_assessment_check_13,
          dailyRiskAssessmentCheck14: data.daily_risk_assessment_check_14,
          dailyRiskAssessmentCheck15: data.daily_risk_assessment_check_15,
          dailyRiskAssessmentCheck16: data.daily_risk_assessment_check_16,
          dailyRiskAssessmentCheck17: data.daily_risk_assessment_check_17,
          dailyRiskAssessmentCheck18: data.daily_risk_assessment_check_18,
          dailyRiskAssessmentCheck19: data.daily_risk_assessment_check_19,
          dailyRiskAssessmentCheck20: data.daily_risk_assessment_check_20,
          dailyRiskAssessmentCheck21: data.daily_risk_assessment_check_21,
          dailyRiskAssessmentCheck22: data.daily_risk_assessment_check_22,
          dailyRiskAssessmentCheck23: data.daily_risk_assessment_check_23,
          dailyRiskAssessmentCheck24: data.daily_risk_assessment_check_24,
          dailyRiskAssessmentCheck25: data.daily_risk_assessment_check_25,
          dailyRiskAssessmentCheck26: data.daily_risk_assessment_check_26,
          dailyRiskAssessmentCheck27: data.daily_risk_assessment_check_27,
          dailyRiskAssessmentCheck28: data.daily_risk_assessment_check_28,
          dailyRiskAssessmentCheck29: data.daily_risk_assessment_check_29,
          dailyRiskAssessmentCheck30: data.daily_risk_assessment_check_30,
          dailyRiskAssessmentCheck31: data.daily_risk_assessment_check_31,
          dailyRiskAssessmentCheck32: data.daily_risk_assessment_check_32,
          dailyRiskAssessmentCheck33: data.daily_risk_assessment_check_33,
          dailyRiskAssessmentCheck34: data.daily_risk_assessment_check_34,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  // Set the state variable value to the value supplied from the input
  updateStateValue = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  editCheck() {
    const documentUpdate = app.firestore().collection("dailyRiskAssessment").doc(this.state.key);
    documentUpdate
      .set({
        daily_risk_assessment_date: this.state.dailyRiskAssessmentDate,
        daily_risk_assessment_is_completed: this.state.dailyRiskAssessmentIsCompleted,
        daily_risk_assessment_note: this.state.dailyRiskAssessmentNote,
        daily_risk_assessment_check_1: this.state.dailyRiskAssessmentCheck1,
        daily_risk_assessment_check_2: this.state.dailyRiskAssessmentCheck2,
        daily_risk_assessment_check_3: this.state.dailyRiskAssessmentCheck3,
        daily_risk_assessment_check_4: this.state.dailyRiskAssessmentCheck4,
        daily_risk_assessment_check_5: this.state.dailyRiskAssessmentCheck5,
        daily_risk_assessment_check_6: this.state.dailyRiskAssessmentCheck6,
        daily_risk_assessment_check_7: this.state.dailyRiskAssessmentCheck7,
        daily_risk_assessment_check_8: this.state.dailyRiskAssessmentCheck8,
        daily_risk_assessment_check_9: this.state.dailyRiskAssessmentCheck9,
        daily_risk_assessment_check_10: this.state.dailyRiskAssessmentCheck10,
        daily_risk_assessment_check_11: this.state.dailyRiskAssessmentCheck11,
        daily_risk_assessment_check_12: this.state.dailyRiskAssessmentCheck12,
        daily_risk_assessment_check_13: this.state.dailyRiskAssessmentCheck13,
        daily_risk_assessment_check_14: this.state.dailyRiskAssessmentCheck14,
        daily_risk_assessment_check_15: this.state.dailyRiskAssessmentCheck15,
        daily_risk_assessment_check_16: this.state.dailyRiskAssessmentCheck16,
        daily_risk_assessment_check_17: this.state.dailyRiskAssessmentCheck17,
        daily_risk_assessment_check_18: this.state.dailyRiskAssessmentCheck18,
        daily_risk_assessment_check_19: this.state.dailyRiskAssessmentCheck19,
        daily_risk_assessment_check_20: this.state.dailyRiskAssessmentCheck20,
        daily_risk_assessment_check_21: this.state.dailyRiskAssessmentCheck21,
        daily_risk_assessment_check_22: this.state.dailyRiskAssessmentCheck22,
        daily_risk_assessment_check_23: this.state.dailyRiskAssessmentCheck23,
        daily_risk_assessment_check_24: this.state.dailyRiskAssessmentCheck24,
        daily_risk_assessment_check_25: this.state.dailyRiskAssessmentCheck25,
        daily_risk_assessment_check_26: this.state.dailyRiskAssessmentCheck26,
        daily_risk_assessment_check_27: this.state.dailyRiskAssessmentCheck27,
        daily_risk_assessment_check_28: this.state.dailyRiskAssessmentCheck28,
        daily_risk_assessment_check_29: this.state.dailyRiskAssessmentCheck29,
        daily_risk_assessment_check_30: this.state.dailyRiskAssessmentCheck30,
        daily_risk_assessment_check_31: this.state.dailyRiskAssessmentCheck31,
        daily_risk_assessment_check_32: this.state.dailyRiskAssessmentCheck32,
        daily_risk_assessment_check_33: this.state.dailyRiskAssessmentCheck33,
        daily_risk_assessment_check_34: this.state.dailyRiskAssessmentCheck34,
      })
      .then(() => {
        this.props.navigation.navigate("HealthSafetyChecks");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.dailyRiskAssessmentDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.space}></View>
          <Text style={styles.boldCentre}>All Areas</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={[styles.bold, styles.space]}>Wires, Cables & Sockets:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck1}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck1")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Floor clear of trips & spills:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck2}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck2")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Radiator & hot water temperatures suitable:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck3}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck3")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Spare batteries out of reach:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck4}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck4")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Plastic bags stored away:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck5}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck5")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Air fresheners & candles out of reach:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck6}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck6")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Medicines & painkillers stored away:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck7}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck7")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Matches & lighters stored away:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck8}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck8")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Furniture stable & equipment safe:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck9}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck9")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Safety gates secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck10}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck10")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Escape routes clear (keys safe):</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck11}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck11")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Fire safety equipment checked & tested:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck12}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck12")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Carbon monoxide alarm checked & tested:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck13}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck13")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.space}></View>
          <Text style={styles.boldCentre}>Lounge/Play areas</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Toys & equipment clean and safe:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck14}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck14")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Small toys out of reach babies & toddlers:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck15}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck15")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Safety equipment secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck16}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck16")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Window/blinds chords secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck17}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck17")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.space}></View>
          <Text style={styles.boldCentre}>Kitchen/Eating area</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Clean & tidy:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck18}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck18")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Cleaning products & alcohol secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck19}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck19")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Knives & other hazards secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck20}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck20")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.space}></View>
          <Text style={styles.boldCentre}>Toilet/Bathroom/Changing area</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Clean & tidy:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck21}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck21")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Toiletries out of reach:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck22}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck22")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Clean towels & paper towels:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck23}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck23")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Toilet roll, wipes, nappy bags & gloves:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck24}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck24")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.space}></View>
          <Text style={styles.boldCentre}>Garden, outdoors & outings</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Gates locked & boundaries secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck25}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck25")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Animal fouling:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck26}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck26")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Trip hazards:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck27}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck27")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Sharp objects & garden tools secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck28}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck28")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Play equipment safe:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck29}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck29")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Buggies, pushchairs & reins secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck30}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck30")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Car seats - appropriate and secure:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck31}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck31")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Outings risk assessment:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck32}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck32")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Emergency contact details:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck33}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck33")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>First aid box:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              disabled={false}
              value={this.state.dailyRiskAssessmentCheck34}
              onValueChange={(value) => this.updateStateValue(value, "dailyRiskAssessmentCheck34")}
              tintColors={{ true: "#0B8FDC", false: "orange" }}
            />
          </View>
          <View style={styles.space}></View>
          <Button 
            mode="contained"
            uppercase={false}
            color="#0B8FDC"
            onPress={() => this.editCheck()}>
            <Text style={styles.buttonTextMenu}>Update</Text>
          </Button>
          <View style={styles.space}></View>
          <View style={styles.buttonSpace}></View>
        </ScrollView>
      </View>
    );
  }
}
