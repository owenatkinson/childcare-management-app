import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default function AddDailyRiskAssessment({route}) {
    const { changeDate } = route.params;
    const [ dailyRiskAssessmentIsCompleted, setDailyRiskAssessmentIsCompleted ] = useState('');
    const [ dailyRiskAssessmentNote, setDailyRiskAssessmentNote ] = useState('');
    const [ dailyRiskAssessmentCheck1, setDailyRiskAssessmentCheck1 ] = useState('');
    const [ dailyRiskAssessmentCheck2, setDailyRiskAssessmentCheck2 ] = useState('');
    const [ dailyRiskAssessmentCheck3, setDailyRiskAssessmentCheck3 ] = useState('');
    const [ dailyRiskAssessmentCheck4, setDailyRiskAssessmentCheck4 ] = useState('');
    const [ dailyRiskAssessmentCheck5, setDailyRiskAssessmentCheck5 ] = useState('');
    const [ dailyRiskAssessmentCheck6, setDailyRiskAssessmentCheck6 ] = useState('');
    const [ dailyRiskAssessmentCheck7, setDailyRiskAssessmentCheck7 ] = useState('');
    const [ dailyRiskAssessmentCheck8, setDailyRiskAssessmentCheck8 ] = useState('');
    const [ dailyRiskAssessmentCheck9, setDailyRiskAssessmentCheck9 ] = useState('');
    const [ dailyRiskAssessmentCheck10, setDailyRiskAssessmentCheck10 ] = useState('');
    const [ dailyRiskAssessmentCheck11, setDailyRiskAssessmentCheck11 ] = useState('');
    const [ dailyRiskAssessmentCheck12, setDailyRiskAssessmentCheck12 ] = useState('');
    const [ dailyRiskAssessmentCheck13, setDailyRiskAssessmentCheck13 ] = useState('');
    const [ dailyRiskAssessmentCheck14, setDailyRiskAssessmentCheck14 ] = useState('');
    const [ dailyRiskAssessmentCheck15, setDailyRiskAssessmentCheck15 ] = useState('');
    const [ dailyRiskAssessmentCheck16, setDailyRiskAssessmentCheck16 ] = useState('');
    const [ dailyRiskAssessmentCheck17, setDailyRiskAssessmentCheck17 ] = useState('');
    const [ dailyRiskAssessmentCheck18, setDailyRiskAssessmentCheck18 ] = useState('');
    const [ dailyRiskAssessmentCheck19, setDailyRiskAssessmentCheck19 ] = useState('');
    const [ dailyRiskAssessmentCheck20, setDailyRiskAssessmentCheck20 ] = useState('');
    const [ dailyRiskAssessmentCheck21, setDailyRiskAssessmentCheck21 ] = useState('');
    const [ dailyRiskAssessmentCheck22, setDailyRiskAssessmentCheck22 ] = useState('');
    const [ dailyRiskAssessmentCheck23, setDailyRiskAssessmentCheck23 ] = useState('');
    const [ dailyRiskAssessmentCheck24, setDailyRiskAssessmentCheck24 ] = useState('');
    const [ dailyRiskAssessmentCheck25, setDailyRiskAssessmentCheck25 ] = useState('');
    const [ dailyRiskAssessmentCheck26, setDailyRiskAssessmentCheck26 ] = useState('');
    const [ dailyRiskAssessmentCheck27, setDailyRiskAssessmentCheck27 ] = useState('');
    const [ dailyRiskAssessmentCheck28, setDailyRiskAssessmentCheck28 ] = useState('');
    const [ dailyRiskAssessmentCheck29, setDailyRiskAssessmentCheck29 ] = useState('');
    const [ dailyRiskAssessmentCheck30, setDailyRiskAssessmentCheck30 ] = useState('');
    const [ dailyRiskAssessmentCheck31, setDailyRiskAssessmentCheck31 ] = useState('');
    const [ dailyRiskAssessmentCheck32, setDailyRiskAssessmentCheck32 ] = useState('');
    const [ dailyRiskAssessmentCheck33, setDailyRiskAssessmentCheck33 ] = useState('');
    const [ dailyRiskAssessmentCheck34, setDailyRiskAssessmentCheck34 ] = useState('');

    const fireDB = app.firestore().collection('dailyRiskAssessment');

    async function addCheck() {
        await fireDB.add({
            daily_risk_assessment_date: changeDate,
            daily_risk_assessment_is_completed: dailyRiskAssessmentIsCompleted,
            daily_risk_assessment_note: dailyRiskAssessmentNote,
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
            daily_risk_assessment_check_34: dailyRiskAssessmentCheck34
    });
    setDailyRiskAssessmentIsCompleted('');
    setDailyRiskAssessmentNote('');
    setDailyRiskAssessmentCheck1('');
    setDailyRiskAssessmentCheck2('');
    setDailyRiskAssessmentCheck3('');
    setDailyRiskAssessmentCheck4('');
    setDailyRiskAssessmentCheck5('');
    setDailyRiskAssessmentCheck6('');
    setDailyRiskAssessmentCheck7('');
    setDailyRiskAssessmentCheck8('');
    setDailyRiskAssessmentCheck9('');
    setDailyRiskAssessmentCheck10('');
    setDailyRiskAssessmentCheck11('');
    setDailyRiskAssessmentCheck12('');
    setDailyRiskAssessmentCheck13('');
    setDailyRiskAssessmentCheck14('');
    setDailyRiskAssessmentCheck15('');
    setDailyRiskAssessmentCheck16('');
    setDailyRiskAssessmentCheck17('');
    setDailyRiskAssessmentCheck18('');
    setDailyRiskAssessmentCheck19('');
    setDailyRiskAssessmentCheck20('');
    setDailyRiskAssessmentCheck21('');
    setDailyRiskAssessmentCheck22('');
    setDailyRiskAssessmentCheck23('');
    setDailyRiskAssessmentCheck24('');
    setDailyRiskAssessmentCheck25('');
    setDailyRiskAssessmentCheck26('');
    setDailyRiskAssessmentCheck27('');
    setDailyRiskAssessmentCheck28('');
    setDailyRiskAssessmentCheck29('');
    setDailyRiskAssessmentCheck30('');
    setDailyRiskAssessmentCheck31('');
    setDailyRiskAssessmentCheck32('');
    setDailyRiskAssessmentCheck33('');
    setDailyRiskAssessmentCheck34('');
    this.props.navigation.navigate('HealthSafetyChecks');
  }

  return (
    <View>
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.headerText}>All Areas</Text>
            <Text style={[styles.bold, styles.space]}>Wires, Cables & Sockets</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck1}
                onChangeText={setDailyRiskAssessmentCheck1}
            />
            <Text style={styles.bold}>Floor clear - trips/spills</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck2}
                onChangeText={setDailyRiskAssessmentCheck2}
            />
            <Text style={styles.bold}>Radiator/hot water temperatures</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck3}
                onChangeText={setDailyRiskAssessmentCheck3}
            />
            <Text style={styles.bold}>Spare batteries out of reach</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck4}
                onChangeText={setDailyRiskAssessmentCheck4}
            />
            <Text style={styles.bold}>Plastic bags stored away</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck5}
                onChangeText={setDailyRiskAssessmentCheck5}
            />
            <Text style={styles.bold}>Air fresheners/candles out of reach</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck6}
                onChangeText={setDailyRiskAssessmentCheck6}
            />
            <Text style={styles.bold}>Medicines/painkillers stored away</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck7}
                onChangeText={setDailyRiskAssessmentCheck7}
            />
            <Text style={styles.bold}>Matches/lighters stored away</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck8}
                onChangeText={setDailyRiskAssessmentCheck8}
            />
            <Text style={styles.bold}>Furniture stable/equipment safe</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck9}
                onChangeText={setDailyRiskAssessmentCheck9}
            />
            <Text style={styles.bold}>Safety gates secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck10}
                onChangeText={setDailyRiskAssessmentCheck10}
            />
            <Text style={styles.bold}>Escape routes clear (keys safe)</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck11}
                onChangeText={setDailyRiskAssessmentCheck11}
            />
            <Text style={styles.bold}>Fire safety equipment checked/tested</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck12}
                onChangeText={setDailyRiskAssessmentCheck12}
            />
            <Text style={styles.bold}>Carbon monoxide alarm checked/tested</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck13}
                onChangeText={setDailyRiskAssessmentCheck13}
            />
            <Text style={[styles.headerText]}>Lounge/Play areas</Text>
            <Text style={styles.bold}>Toys/equipment clean and safe</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck14}
                onChangeText={setDailyRiskAssessmentCheck14}
            />
            <Text style={styles.bold}>Small toys out of reach babies/toddlers</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck15}
                onChangeText={setDailyRiskAssessmentCheck15}
            />
            <Text style={styles.bold}>Safety equipment secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck16}
                onChangeText={setDailyRiskAssessmentCheck16}
            />
            <Text style={styles.bold}>Window/blinds chords secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck17}
                onChangeText={setDailyRiskAssessmentCheck17}
            />
            <Text style={styles.headerText}>Kitchen/Eating area</Text>
            <Text style={styles.bold}>Clean and tidy</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck18}
                onChangeText={setDailyRiskAssessmentCheck18}
            />
            <Text style={styles.bold}>Cleaning products/alcohol secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck19}
                onChangeText={setDailyRiskAssessmentCheck19}
            />
            <Text style={styles.bold}>Knives/other hazards secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck20}
                onChangeText={setDailyRiskAssessmentCheck20}
            />
            <Text style={styles.headerText}>Toilet/Bathroom/Changing area</Text>
            <Text style={styles.bold}>Clean and tidy</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck21}
                onChangeText={setDailyRiskAssessmentCheck21}
            />
            <Text style={styles.bold}>Toiletries out of reach</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck22}
                onChangeText={setDailyRiskAssessmentCheck22}
            />
            <Text style={styles.bold}>Clean towels/paper towels</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck23}
                onChangeText={setDailyRiskAssessmentCheck23}
            />
            <Text style={styles.bold}>Toilet roll/wipes/nappy bags/gloves</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck24}
                onChangeText={setDailyRiskAssessmentCheck24}
            />
            <Text style={styles.headerText}>Garden/outdoors/outings</Text>
            <Text style={styles.bold}>Gates locked/boundaries secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck25}
                onChangeText={setDailyRiskAssessmentCheck25}
            />
            <Text style={styles.bold}>Animal fouling</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck26}
                onChangeText={setDailyRiskAssessmentCheck26}
            />
            <Text style={styles.bold}>Trip hazards</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck27}
                onChangeText={setDailyRiskAssessmentCheck27}
            />
            <Text style={styles.bold}>Sharp objects/garden tools secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck28}
                onChangeText={setDailyRiskAssessmentCheck28}
            />
            <Text style={styles.bold}>Play equipment safe</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck29}
                onChangeText={setDailyRiskAssessmentCheck29}
            />
            <Text style={styles.bold}>Buggies/pushchairs/reins secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck30}
                onChangeText={setDailyRiskAssessmentCheck30}
            />
            <Text style={styles.bold}>Car seats - appropriate and secure</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck31}
                onChangeText={setDailyRiskAssessmentCheck31}
            />
            <Text style={styles.bold}>Outings risk assessment</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck32}
                onChangeText={setDailyRiskAssessmentCheck32}
            />
            <Text style={styles.bold}>Emergency contact details</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck33}
                onChangeText={setDailyRiskAssessmentCheck33}
            />
            <Text style={styles.bold}>First aid box</Text>
            <TextInput
                style={styles.input}
                value={dailyRiskAssessmentCheck34}
                onChangeText={setDailyRiskAssessmentCheck34}
            />
            <View style={styles.space}></View>
            <Button 
                title="Submit Check"
                onPress={() => addCheck()}
            />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: "#DADADA",
    textAlign: 'center',
  }
});