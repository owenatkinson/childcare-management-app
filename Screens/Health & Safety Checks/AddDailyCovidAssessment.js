import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default function AddDailyCovidAssessment({route}) {
    const { changeDate } = route.params;
    const [ dailyCovidAssessmentIsCompleted, setDailyCovidAssessmentIsCompleted ] = useState('');
    const [ dailyCovidAssessmentNote, setDailyCovidAssessmentNote ] = useState('');
    const [ dailyCovidAssessmentCheck1, setDailyCovidAssessmentCheck1 ] = useState('');
    const [ dailyCovidAssessmentCheck2, setDailyCovidAssessmentCheck2 ] = useState('');
    const [ dailyCovidAssessmentCheck3, setDailyCovidAssessmentCheck3 ] = useState('');
    const [ dailyCovidAssessmentCheck4, setDailyCovidAssessmentCheck4 ] = useState('');
    const [ dailyCovidAssessmentCheck5, setDailyCovidAssessmentCheck5 ] = useState('');
    const [ dailyCovidAssessmentCheck6, setDailyCovidAssessmentCheck6 ] = useState('');
    const [ dailyCovidAssessmentCheck7, setDailyCovidAssessmentCheck7 ] = useState('');
    const [ dailyCovidAssessmentCheck8, setDailyCovidAssessmentCheck8 ] = useState('');
    const [ dailyCovidAssessmentCheck9, setDailyCovidAssessmentCheck9 ] = useState('');
    const [ dailyCovidAssessmentCheck10, setDailyCovidAssessmentCheck10 ] = useState('');
    const [ dailyCovidAssessmentCheck11, setDailyCovidAssessmentCheck11 ] = useState('');
    const [ dailyCovidAssessmentCheck12, setDailyCovidAssessmentCheck12 ] = useState('');
    const [ dailyCovidAssessmentCheck13, setDailyCovidAssessmentCheck13 ] = useState('');
    const [ dailyCovidAssessmentCheck14, setDailyCovidAssessmentCheck14 ] = useState('');
    const [ dailyCovidAssessmentCheck15, setDailyCovidAssessmentCheck15 ] = useState('');
    const [ dailyCovidAssessmentCheck16, setDailyCovidAssessmentCheck16 ] = useState('');
    const [ dailyCovidAssessmentCheck17, setDailyCovidAssessmentCheck17 ] = useState('');
    const [ dailyCovidAssessmentCheck18, setDailyCovidAssessmentCheck18 ] = useState('');
    const [ dailyCovidAssessmentCheck19, setDailyCovidAssessmentCheck19 ] = useState('');
    const [ dailyCovidAssessmentCheck20, setDailyCovidAssessmentCheck20 ] = useState('');
    const [ dailyCovidAssessmentCheck21, setDailyCovidAssessmentCheck21 ] = useState('');
    const [ dailyCovidAssessmentCheck22, setDailyCovidAssessmentCheck22 ] = useState('');
    const [ dailyCovidAssessmentCheck23, setDailyCovidAssessmentCheck23 ] = useState('');
    const [ dailyCovidAssessmentCheck24, setDailyCovidAssessmentCheck24 ] = useState('');
    const [ dailyCovidAssessmentCheck25, setDailyCovidAssessmentCheck25 ] = useState('');
    const [ dailyCovidAssessmentCheck26, setDailyCovidAssessmentCheck26 ] = useState('');
    const [ dailyCovidAssessmentCheck27, setDailyCovidAssessmentCheck27 ] = useState('');
    const [ dailyCovidAssessmentCheck28, setDailyCovidAssessmentCheck28 ] = useState('');
    const [ dailyCovidAssessmentCheck29, setDailyCovidAssessmentCheck29 ] = useState('');
    const [ dailyCovidAssessmentCheck30, setDailyCovidAssessmentCheck30 ] = useState('');

    const fireDB = app.firestore().collection('dailyCovidAssessment');

    async function addCheck() {
        await fireDB.add({
            daily_covid_assessment_date: changeDate,
            daily_covid_assessment_is_completed: dailyCovidAssessmentIsCompleted,
            daily_covid_assessment_note: dailyCovidAssessmentNote,
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
    setDailyCovidAssessmentIsCompleted('');
    setDailyCovidAssessmentNote('');
    setDailyCovidAssessmentCheck1('');
    setDailyCovidAssessmentCheck2('');
    setDailyCovidAssessmentCheck3('');
    setDailyCovidAssessmentCheck4('');
    setDailyCovidAssessmentCheck5('');
    setDailyCovidAssessmentCheck6('');
    setDailyCovidAssessmentCheck7('');
    setDailyCovidAssessmentCheck8('');
    setDailyCovidAssessmentCheck9('');
    setDailyCovidAssessmentCheck10('');
    setDailyCovidAssessmentCheck11('');
    setDailyCovidAssessmentCheck12('');
    setDailyCovidAssessmentCheck13('');
    setDailyCovidAssessmentCheck14('');
    setDailyCovidAssessmentCheck15('');
    setDailyCovidAssessmentCheck16('');
    setDailyCovidAssessmentCheck17('');
    setDailyCovidAssessmentCheck18('');
    setDailyCovidAssessmentCheck19('');
    setDailyCovidAssessmentCheck20('');
    setDailyCovidAssessmentCheck21('');
    setDailyCovidAssessmentCheck22('');
    setDailyCovidAssessmentCheck23('');
    setDailyCovidAssessmentCheck24('');
    setDailyCovidAssessmentCheck25('');
    setDailyCovidAssessmentCheck26('');
    setDailyCovidAssessmentCheck27('');
    setDailyCovidAssessmentCheck28('');
    setDailyCovidAssessmentCheck29('');
    setDailyCovidAssessmentCheck30('');
    this.props.navigation.navigate('HealthSafetyChecks');
  }

  return (
    <View>
    <ScrollView>
      <View style={styles.space}></View>
            <Text style={styles.bold}>Children put into childminder's care at the door</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck1}
                onChangeText={setDailyCovidAssessmentCheck1}
            />
            <Text style={styles.bold}>Staggered drop off and pick up</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck2}
                onChangeText={setDailyCovidAssessmentCheck2}
            />
            <Text style={styles.bold}>Ask if parents, children siblings have symptoms</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck3}
                onChangeText={setDailyCovidAssessmentCheck3}
            />
            <Text style={styles.bold}>Coats and shoes off</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck4}
                onChangeText={setDailyCovidAssessmentCheck4}
            />
            <Text style={styles.bold}>Wash hands with soap and water</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck5}
                onChangeText={setDailyCovidAssessmentCheck5}
            />
            <Text style={styles.bold}>Open windows and doors for ventilation where possible</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck6}
                onChangeText={setDailyCovidAssessmentCheck6}
            />
            <Text style={styles.bold}>Review risk assessment regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck7}
                onChangeText={setDailyCovidAssessmentCheck7}
            />
            <Text style={styles.bold}>Extra cleaning of toilet, taps, switch and handles</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck8}
                onChangeText={setDailyCovidAssessmentCheck8}
            />
            <Text style={styles.bold}>Wash hands before and after using toilet</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck9}
                onChangeText={setDailyCovidAssessmentCheck9}
            />
            <Text style={styles.bold}>Individual hand towels, flannels or paper towels</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck10}
                onChangeText={setDailyCovidAssessmentCheck10}
            />
            <Text style={styles.bold}>Liquid soap available and bottle cleaned regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck11}
                onChangeText={setDailyCovidAssessmentCheck11}
            />
            <Text style={styles.bold}>Wash hands before and after outdoor play</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck12}
                onChangeText={setDailyCovidAssessmentCheck12}
            />
            <Text style={styles.bold}>Sanitiser and wipes taken on outings</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck13}
                onChangeText={setDailyCovidAssessmentCheck13}
            />
            <Text style={styles.bold}>Clean outdoor equipment regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck14}
                onChangeText={setDailyCovidAssessmentCheck14}
            />
            <Text style={styles.bold}>Record of outings away from the childminders home</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck15}
                onChangeText={setDailyCovidAssessmentCheck15}
            />
            <Text style={styles.bold}>Chairs and high chairs sanitised regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck16}
                onChangeText={setDailyCovidAssessmentCheck16}
            />
            <Text style={styles.bold}>Floors, surfaces, handles, light switches cleaned regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck17}
                onChangeText={setDailyCovidAssessmentCheck17}
            />
            <Text style={styles.bold}>Toys wiped when necessary and deep cleaned once a day</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck18}
                onChangeText={setDailyCovidAssessmentCheck18}
            />
            <Text style={styles.bold}>Limit toys and rotate</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck19}
                onChangeText={setDailyCovidAssessmentCheck19}
            />
            <Text style={styles.bold}>Tissues and wipes readily available</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck20}
                onChangeText={setDailyCovidAssessmentCheck20}
            />
            <Text style={styles.bold}>Bedding changed daily</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck21}
                onChangeText={setDailyCovidAssessmentCheck21}
            />
            <Text style={styles.bold}>Bins wiped and emptied daily</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck22}
                onChangeText={setDailyCovidAssessmentCheck22}
            />
            <Text style={styles.bold}>Any temperatures taken must be recorded</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck23}
                onChangeText={setDailyCovidAssessmentCheck23}
            />
            <Text style={styles.bold}>Hands washed before getting into the car</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck24}
                onChangeText={setDailyCovidAssessmentCheck24}
            />
            <Text style={styles.bold}>Seatbelts, handles and car seats cleaned regularly</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck25}
                onChangeText={setDailyCovidAssessmentCheck25}
            />
            <Text style={styles.bold}>Children spaced as much as possible</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck26}
                onChangeText={setDailyCovidAssessmentCheck26}
            />
            <Text style={styles.bold}>Air con switched off where possible</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck27}
                onChangeText={setDailyCovidAssessmentCheck27}
            />
            <Text style={styles.bold}>Windows open for ventilation</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck28}
                onChangeText={setDailyCovidAssessmentCheck28}
            />
            <Text style={styles.bold}>No food or drink consumed in car</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck29}
                onChangeText={setDailyCovidAssessmentCheck29}
            />
            <Text style={styles.bold}>Wipes, tissues and hand sanitiser available</Text>
            <TextInput
                style={styles.input}
                value={dailyCovidAssessmentCheck30}
                onChangeText={setDailyCovidAssessmentCheck30}
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
  }
});