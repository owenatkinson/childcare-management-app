import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import app from "../../../Components/firebase";
import "firebase/firestore";
const styles = require("../../../Styles/general");

// navigation parameter to navigate the user to a new page, route parameter to set the date 
export default function AddDailyCovidAssessment({ route, navigation }) {
  const { changeDate } = route.params;
  // Initialising the state value of variables
  const [dailyCovidAssessmentCheck1, setDailyCovidAssessmentCheck1] = useState("");
  const [dailyCovidAssessmentCheck2, setDailyCovidAssessmentCheck2] = useState("");
  const [dailyCovidAssessmentCheck3, setDailyCovidAssessmentCheck3] = useState("");
  const [dailyCovidAssessmentCheck4, setDailyCovidAssessmentCheck4] = useState("");
  const [dailyCovidAssessmentCheck5, setDailyCovidAssessmentCheck5] = useState("");
  const [dailyCovidAssessmentCheck6, setDailyCovidAssessmentCheck6] = useState("");
  const [dailyCovidAssessmentCheck7, setDailyCovidAssessmentCheck7] = useState("");
  const [dailyCovidAssessmentCheck8, setDailyCovidAssessmentCheck8] = useState("");
  const [dailyCovidAssessmentCheck9, setDailyCovidAssessmentCheck9] = useState("");
  const [dailyCovidAssessmentCheck10, setDailyCovidAssessmentCheck10] = useState("");
  const [dailyCovidAssessmentCheck11, setDailyCovidAssessmentCheck11] = useState("");
  const [dailyCovidAssessmentCheck12, setDailyCovidAssessmentCheck12] = useState("");
  const [dailyCovidAssessmentCheck13, setDailyCovidAssessmentCheck13] = useState("");
  const [dailyCovidAssessmentCheck14, setDailyCovidAssessmentCheck14] = useState("");
  const [dailyCovidAssessmentCheck15, setDailyCovidAssessmentCheck15] = useState("");
  const [dailyCovidAssessmentCheck16, setDailyCovidAssessmentCheck16] = useState("");
  const [dailyCovidAssessmentCheck17, setDailyCovidAssessmentCheck17] = useState("");
  const [dailyCovidAssessmentCheck18, setDailyCovidAssessmentCheck18] = useState("");
  const [dailyCovidAssessmentCheck19, setDailyCovidAssessmentCheck19] = useState("");
  const [dailyCovidAssessmentCheck20, setDailyCovidAssessmentCheck20] = useState("");
  const [dailyCovidAssessmentCheck21, setDailyCovidAssessmentCheck21] = useState("");
  const [dailyCovidAssessmentCheck22, setDailyCovidAssessmentCheck22] = useState("");
  const [dailyCovidAssessmentCheck23, setDailyCovidAssessmentCheck23] = useState("");
  const [dailyCovidAssessmentCheck24, setDailyCovidAssessmentCheck24] = useState("");
  const [dailyCovidAssessmentCheck25, setDailyCovidAssessmentCheck25] = useState("");
  const [dailyCovidAssessmentCheck26, setDailyCovidAssessmentCheck26] = useState("");
  const [dailyCovidAssessmentCheck27, setDailyCovidAssessmentCheck27] = useState("");
  const [dailyCovidAssessmentCheck28, setDailyCovidAssessmentCheck28] = useState("");
  const [dailyCovidAssessmentCheck29, setDailyCovidAssessmentCheck29] = useState("");
  const [dailyCovidAssessmentCheck30, setDailyCovidAssessmentCheck30] = useState("");
  // Initialising connection to dailyCovidAssessment database table
  const fireDB = app.firestore().collection("dailyCovidAssessment");

  // Add variable values to the database and navigate the user to HealthSafetyChecks page
  async function addCheck() {
    await fireDB.add({
      daily_covid_assessment_date: changeDate,
      daily_covid_assessment_check_1: dailyCovidAssessmentCheck1,
      daily_covid_assessment_check_2: dailyCovidAssessmentCheck2,
      daily_covid_assessment_check_3: dailyCovidAssessmentCheck3,
      daily_covid_assessment_check_4: dailyCovidAssessmentCheck4,
      daily_covid_assessment_check_5: dailyCovidAssessmentCheck5,
      daily_covid_assessment_check_6: dailyCovidAssessmentCheck6,
      daily_covid_assessment_check_7: dailyCovidAssessmentCheck7,
      daily_covid_assessment_check_8: dailyCovidAssessmentCheck8,
      daily_covid_assessment_check_9: dailyCovidAssessmentCheck9,
      daily_covid_assessment_check_10: dailyCovidAssessmentCheck10,
      daily_covid_assessment_check_11: dailyCovidAssessmentCheck11,
      daily_covid_assessment_check_12: dailyCovidAssessmentCheck12,
      daily_covid_assessment_check_13: dailyCovidAssessmentCheck13,
      daily_covid_assessment_check_14: dailyCovidAssessmentCheck14,
      daily_covid_assessment_check_15: dailyCovidAssessmentCheck15,
      daily_covid_assessment_check_16: dailyCovidAssessmentCheck16,
      daily_covid_assessment_check_17: dailyCovidAssessmentCheck17,
      daily_covid_assessment_check_18: dailyCovidAssessmentCheck18,
      daily_covid_assessment_check_19: dailyCovidAssessmentCheck19,
      daily_covid_assessment_check_20: dailyCovidAssessmentCheck20,
      daily_covid_assessment_check_21: dailyCovidAssessmentCheck21,
      daily_covid_assessment_check_22: dailyCovidAssessmentCheck22,
      daily_covid_assessment_check_23: dailyCovidAssessmentCheck23,
      daily_covid_assessment_check_24: dailyCovidAssessmentCheck24,
      daily_covid_assessment_check_25: dailyCovidAssessmentCheck25,
      daily_covid_assessment_check_26: dailyCovidAssessmentCheck26,
      daily_covid_assessment_check_27: dailyCovidAssessmentCheck27,
      daily_covid_assessment_check_28: dailyCovidAssessmentCheck28,
      daily_covid_assessment_check_29: dailyCovidAssessmentCheck29,
      daily_covid_assessment_check_30: dailyCovidAssessmentCheck30,
    });
    navigation.navigate("HealthSafetyChecks");
  }

  return (
    <View>
      <View style={styles.titleHeader}>
        <Text style={styles.buttonText}>{changeDate}</Text>
      </View>
      <ScrollView>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Children put into childminder's care at the door:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck1}
            onValueChange={setDailyCovidAssessmentCheck1}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Staggered drop off & pick up:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck2}
            onValueChange={setDailyCovidAssessmentCheck2}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Ask if parents or siblings have symptoms:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck3}
            onValueChange={setDailyCovidAssessmentCheck3}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Coats & shoes off:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck4}
            onValueChange={setDailyCovidAssessmentCheck4}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Wash hands with soap & water:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck5}
            onValueChange={setDailyCovidAssessmentCheck5}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Open windows/doors for ventilation when possible:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck6}
            onValueChange={setDailyCovidAssessmentCheck6}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Review Risk Assessment regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck7}
            onValueChange={setDailyCovidAssessmentCheck7}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Cleaning of toilet, taps, switch & handles:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck8}
            onValueChange={setDailyCovidAssessmentCheck8}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Wash hands before & after using toilet:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck9}
            onValueChange={setDailyCovidAssessmentCheck9}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Individual hand towels/flannels/paper towels used:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck10}
            onValueChange={setDailyCovidAssessmentCheck10}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Liquid soap available & bottle cleaned regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck11}
            onValueChange={setDailyCovidAssessmentCheck11}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Wash hands before & after outdoor play:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck12}
            onValueChange={setDailyCovidAssessmentCheck12}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Sanitiser & wipes taken on outings:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck13}
            onValueChange={setDailyCovidAssessmentCheck13}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Clean outdoor equipment regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck14}
            onValueChange={setDailyCovidAssessmentCheck14}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Record of outings away from childminder's home:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck15}
            onValueChange={setDailyCovidAssessmentCheck15}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Chairs & high chairs sanitised regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck16}
            onValueChange={setDailyCovidAssessmentCheck16}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Surfaces cleaned regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck17}
            onValueChange={setDailyCovidAssessmentCheck17}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <Text style={styles.standardText}>(Floors, surfaces, handles, light switches)</Text>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Toys wiped when necessary:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck18}
            onValueChange={setDailyCovidAssessmentCheck18}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <Text style={styles.standardText}>(Deep-cleaned once per day)</Text>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Limit toys and rotate:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck19}
            onValueChange={setDailyCovidAssessmentCheck19}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Tissues & wipes readily available:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck20}
            onValueChange={setDailyCovidAssessmentCheck20}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Bedding changed daily:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck21}
            onValueChange={setDailyCovidAssessmentCheck21}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Bins wiped & emptied daily:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck22}
            onValueChange={setDailyCovidAssessmentCheck22}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Any temperatures taken must be recorded:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck23}
            onValueChange={setDailyCovidAssessmentCheck23}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Hands washed before getting into the car:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck24}
            onValueChange={setDailyCovidAssessmentCheck24}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Seatbelts, handles & car seats cleaned regularly:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck25}
            onValueChange={setDailyCovidAssessmentCheck25}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Children spaced as much as possible:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck26}
            onValueChange={setDailyCovidAssessmentCheck26}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Air con switched off where possible:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck27}
            onValueChange={setDailyCovidAssessmentCheck27}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Windows open for ventilation:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck28}
            onValueChange={setDailyCovidAssessmentCheck28}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>No food/drink consumed in car:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck29}
            onValueChange={setDailyCovidAssessmentCheck29}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.checkBoxPositioning}>
          <Text style={styles.bold}>Wipes, tissues & hand sanitiser available:</Text>
          <CheckBox
            style={styles.checkBoxAlignRight}
            disabled={false}
            value={dailyCovidAssessmentCheck30}
            onValueChange={setDailyCovidAssessmentCheck30}
            tintColors={{ true: "#0B8FDC", false: "orange" }}
          />
        </View>
        <View style={styles.space}></View>
        <Button 
          mode="contained"
          uppercase={false}
          color="#0B8FDC"
          onPress={() => addCheck()}>
          <Text style={styles.buttonTextMenu}>Submit Check</Text>
        </Button>
        <View style={styles.space}></View>
        <View style={styles.buttonSpace}></View>
      </ScrollView>
    </View>
  );
}
