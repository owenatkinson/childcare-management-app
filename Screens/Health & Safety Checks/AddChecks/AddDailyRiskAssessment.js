import React, { useState } from "react";
import { View, ScrollView, Button, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import app from "../../../Components/firebase";
import "firebase/firestore";
const styles = require("../../../Styles/general");

export default function AddDailyRiskAssessment({ route, navigation }) {
  const { changeDate } = route.params;
  const [dailyRiskAssessmentCheck1, setDailyRiskAssessmentCheck1] = useState("");
  const [dailyRiskAssessmentCheck2, setDailyRiskAssessmentCheck2] = useState("");
  const [dailyRiskAssessmentCheck3, setDailyRiskAssessmentCheck3] = useState("");
  const [dailyRiskAssessmentCheck4, setDailyRiskAssessmentCheck4] = useState("");
  const [dailyRiskAssessmentCheck5, setDailyRiskAssessmentCheck5] = useState("");
  const [dailyRiskAssessmentCheck6, setDailyRiskAssessmentCheck6] = useState("");
  const [dailyRiskAssessmentCheck7, setDailyRiskAssessmentCheck7] = useState("");
  const [dailyRiskAssessmentCheck8, setDailyRiskAssessmentCheck8] = useState("");
  const [dailyRiskAssessmentCheck9, setDailyRiskAssessmentCheck9] = useState("");
  const [dailyRiskAssessmentCheck10, setDailyRiskAssessmentCheck10] = useState("");
  const [dailyRiskAssessmentCheck11, setDailyRiskAssessmentCheck11] = useState("");
  const [dailyRiskAssessmentCheck12, setDailyRiskAssessmentCheck12] = useState("");
  const [dailyRiskAssessmentCheck13, setDailyRiskAssessmentCheck13] = useState("");
  const [dailyRiskAssessmentCheck14, setDailyRiskAssessmentCheck14] = useState("");
  const [dailyRiskAssessmentCheck15, setDailyRiskAssessmentCheck15] = useState("");
  const [dailyRiskAssessmentCheck16, setDailyRiskAssessmentCheck16] = useState("");
  const [dailyRiskAssessmentCheck17, setDailyRiskAssessmentCheck17] = useState("");
  const [dailyRiskAssessmentCheck18, setDailyRiskAssessmentCheck18] = useState("");
  const [dailyRiskAssessmentCheck19, setDailyRiskAssessmentCheck19] = useState("");
  const [dailyRiskAssessmentCheck20, setDailyRiskAssessmentCheck20] = useState("");
  const [dailyRiskAssessmentCheck21, setDailyRiskAssessmentCheck21] = useState("");
  const [dailyRiskAssessmentCheck22, setDailyRiskAssessmentCheck22] = useState("");
  const [dailyRiskAssessmentCheck23, setDailyRiskAssessmentCheck23] = useState("");
  const [dailyRiskAssessmentCheck24, setDailyRiskAssessmentCheck24] = useState("");
  const [dailyRiskAssessmentCheck25, setDailyRiskAssessmentCheck25] = useState("");
  const [dailyRiskAssessmentCheck26, setDailyRiskAssessmentCheck26] = useState("");
  const [dailyRiskAssessmentCheck27, setDailyRiskAssessmentCheck27] = useState("");
  const [dailyRiskAssessmentCheck28, setDailyRiskAssessmentCheck28] = useState("");
  const [dailyRiskAssessmentCheck29, setDailyRiskAssessmentCheck29] = useState("");
  const [dailyRiskAssessmentCheck30, setDailyRiskAssessmentCheck30] = useState("");
  const [dailyRiskAssessmentCheck31, setDailyRiskAssessmentCheck31] = useState("");
  const [dailyRiskAssessmentCheck32, setDailyRiskAssessmentCheck32] = useState("");
  const [dailyRiskAssessmentCheck33, setDailyRiskAssessmentCheck33] = useState("");
  const [dailyRiskAssessmentCheck34, setDailyRiskAssessmentCheck34] = useState("");

  const fireDB = app.firestore().collection("dailyRiskAssessment");

  async function addCheck() {
    await fireDB.add({
      daily_risk_assessment_date: changeDate,
      daily_risk_assessment_check_1: dailyRiskAssessmentCheck1,
      daily_risk_assessment_check_2: dailyRiskAssessmentCheck2,
      daily_risk_assessment_check_3: dailyRiskAssessmentCheck3,
      daily_risk_assessment_check_4: dailyRiskAssessmentCheck4,
      daily_risk_assessment_check_5: dailyRiskAssessmentCheck5,
      daily_risk_assessment_check_6: dailyRiskAssessmentCheck6,
      daily_risk_assessment_check_7: dailyRiskAssessmentCheck7,
      daily_risk_assessment_check_8: dailyRiskAssessmentCheck8,
      daily_risk_assessment_check_9: dailyRiskAssessmentCheck9,
      daily_risk_assessment_check_10: dailyRiskAssessmentCheck10,
      daily_risk_assessment_check_11: dailyRiskAssessmentCheck11,
      daily_risk_assessment_check_12: dailyRiskAssessmentCheck12,
      daily_risk_assessment_check_13: dailyRiskAssessmentCheck13,
      daily_risk_assessment_check_14: dailyRiskAssessmentCheck14,
      daily_risk_assessment_check_15: dailyRiskAssessmentCheck15,
      daily_risk_assessment_check_16: dailyRiskAssessmentCheck16,
      daily_risk_assessment_check_17: dailyRiskAssessmentCheck17,
      daily_risk_assessment_check_18: dailyRiskAssessmentCheck18,
      daily_risk_assessment_check_19: dailyRiskAssessmentCheck19,
      daily_risk_assessment_check_20: dailyRiskAssessmentCheck20,
      daily_risk_assessment_check_21: dailyRiskAssessmentCheck21,
      daily_risk_assessment_check_22: dailyRiskAssessmentCheck22,
      daily_risk_assessment_check_23: dailyRiskAssessmentCheck23,
      daily_risk_assessment_check_24: dailyRiskAssessmentCheck24,
      daily_risk_assessment_check_25: dailyRiskAssessmentCheck25,
      daily_risk_assessment_check_26: dailyRiskAssessmentCheck26,
      daily_risk_assessment_check_27: dailyRiskAssessmentCheck27,
      daily_risk_assessment_check_28: dailyRiskAssessmentCheck28,
      daily_risk_assessment_check_29: dailyRiskAssessmentCheck29,
      daily_risk_assessment_check_30: dailyRiskAssessmentCheck30,
      daily_risk_assessment_check_31: dailyRiskAssessmentCheck31,
      daily_risk_assessment_check_32: dailyRiskAssessmentCheck32,
      daily_risk_assessment_check_33: dailyRiskAssessmentCheck33,
      daily_risk_assessment_check_34: dailyRiskAssessmentCheck34,
    });
    navigation.navigate("HealthSafetyChecks");
  }

  return (
    <View>
      <View style={styles.titleHeader}>
        <Text style={styles.buttonText}>{changeDate}</Text>
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
            value={dailyRiskAssessmentCheck1}
            onValueChange={setDailyRiskAssessmentCheck1}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Floor clear of trips & spills:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck2}
            onValueChange={setDailyRiskAssessmentCheck2}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Radiator & hot water temperatures suitable:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck3}
            onValueChange={setDailyRiskAssessmentCheck3}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Spare batteries out of reach:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck4}
            onValueChange={setDailyRiskAssessmentCheck4}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Plastic bags stored away:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck5}
            onValueChange={setDailyRiskAssessmentCheck5}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Air fresheners & candles out of reach:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck6}
            onValueChange={setDailyRiskAssessmentCheck6}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Medicines & painkillers stored away:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck7}
            onValueChange={setDailyRiskAssessmentCheck7}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Matches & lighters stored away:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck8}
            onValueChange={setDailyRiskAssessmentCheck8}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Furniture stable & equipment safe:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck9}
            onValueChange={setDailyRiskAssessmentCheck9}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Safety gates secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck10}
            onValueChange={setDailyRiskAssessmentCheck10}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Escape routes clear (keys safe):</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck11}
            onValueChange={setDailyRiskAssessmentCheck11}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Fire safety equipment checked & tested:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck12}
            onValueChange={setDailyRiskAssessmentCheck12}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Carbon monoxide alarm checked & tested:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck13}
            onValueChange={setDailyRiskAssessmentCheck13}
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
            value={dailyRiskAssessmentCheck14}
            onValueChange={setDailyRiskAssessmentCheck14}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Small toys out of reach babies & toddlers:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck15}
            onValueChange={setDailyRiskAssessmentCheck15}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Safety equipment secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck16}
            onValueChange={setDailyRiskAssessmentCheck16}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Window/blinds chords secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck17}
            onValueChange={setDailyRiskAssessmentCheck17}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.space}></View>
        <Text style={styles.boldCentre}>Kitchen & eating area</Text>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Clean & tidy:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck18}
            onValueChange={setDailyRiskAssessmentCheck18}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Cleaning products & alcohol secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck19}
            onValueChange={setDailyRiskAssessmentCheck19}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Knives & other hazards secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck20}
            onValueChange={setDailyRiskAssessmentCheck20}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.space}></View>
        <Text style={styles.boldCentre}>Toilet, bathroom & changing area</Text>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Clean & tidy:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck21}
            onValueChange={setDailyRiskAssessmentCheck21}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Toiletries out of reach:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck22}
            onValueChange={setDailyRiskAssessmentCheck22}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Clean towels & paper towels:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck23}
            onValueChange={setDailyRiskAssessmentCheck23}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Toilet roll, wipes, nappy bags & gloves:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck24}
            onValueChange={setDailyRiskAssessmentCheck24}
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
            value={dailyRiskAssessmentCheck25}
            onValueChange={setDailyRiskAssessmentCheck25}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Animal fouling:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck26}
            onValueChange={setDailyRiskAssessmentCheck26}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Trip hazards:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck27}
            onValueChange={setDailyRiskAssessmentCheck27}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Sharp objects & garden tools secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck28}
            onValueChange={setDailyRiskAssessmentCheck28}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Play equipment safe:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck29}
            onValueChange={setDailyRiskAssessmentCheck29}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Buggies, pushchairs & reins secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck30}
            onValueChange={setDailyRiskAssessmentCheck30}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Car seats - appropriate and secure:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck31}
            onValueChange={setDailyRiskAssessmentCheck31}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Outings risk assessment:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck32}
            onValueChange={setDailyRiskAssessmentCheck32}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Emergency contact details:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck33}
            onValueChange={setDailyRiskAssessmentCheck33}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>First aid box:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyRiskAssessmentCheck34}
            onValueChange={setDailyRiskAssessmentCheck34}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.space}></View>
        <Button title="Submit Check" onPress={() => addCheck()} />
        <View style={styles.buttonSpace}></View>
      </ScrollView>
    </View>
  );
}
