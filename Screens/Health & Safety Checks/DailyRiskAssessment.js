import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import app from '../../firebase';
import "firebase/firestore";

export default class DailyRiskAssessment extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dailyRiskAssessmentDate: '',
      dailyRiskAssessmentIsCompleted: '',
      dailyRiskAssessmentNote: '',
      dailyRiskAssessmentCheck1: '',
      dailyRiskAssessmentCheck2: '',
      dailyRiskAssessmentCheck3: '',
      dailyRiskAssessmentCheck4: '',
      dailyRiskAssessmentCheck5: '',
      dailyRiskAssessmentCheck6: '',
      dailyRiskAssessmentCheck7: '',
      dailyRiskAssessmentCheck8: '',
      dailyRiskAssessmentCheck9: '',
      dailyRiskAssessmentCheck10: '',
      dailyRiskAssessmentCheck11: '',
      dailyRiskAssessmentCheck12: '',
      dailyRiskAssessmentCheck13: '',
      dailyRiskAssessmentCheck14: '',
      dailyRiskAssessmentCheck15: '',
      dailyRiskAssessmentCheck16: '',
      dailyRiskAssessmentCheck17: '',
      dailyRiskAssessmentCheck18: '',
      dailyRiskAssessmentCheck19: '',
      dailyRiskAssessmentCheck20: '',
      dailyRiskAssessmentCheck21: '',
      dailyRiskAssessmentCheck22: '',
      dailyRiskAssessmentCheck23: '',
      dailyRiskAssessmentCheck24: '',
      dailyRiskAssessmentCheck25: '',
      dailyRiskAssessmentCheck26: '',
      dailyRiskAssessmentCheck27: '',
      dailyRiskAssessmentCheck28: '',
      dailyRiskAssessmentCheck29: '',
      dailyRiskAssessmentCheck30: '',
      dailyRiskAssessmentCheck31: '',
      dailyRiskAssessmentCheck32: '',
      dailyRiskAssessmentCheck33: '',
      dailyRiskAssessmentCheck34: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('dailyRiskAssessment').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          dailyRiskAssessmentDate: user.daily_risk_assessment_date,
          dailyRiskAssessmentIsCompleted: user.daily_risk_assessment_is_completed,
          dailyRiskAssessmentNote: user.daily_risk_assessment_note,
          dailyRiskAssessmentCheck1: user.daily_risk_assessment_check_1,
          dailyRiskAssessmentCheck2: user.daily_risk_assessment_check_2,
          dailyRiskAssessmentCheck3: user.daily_risk_assessment_check_3,
          dailyRiskAssessmentCheck4: user.daily_risk_assessment_check_4,
          dailyRiskAssessmentCheck5: user.daily_risk_assessment_check_5,
          dailyRiskAssessmentCheck6: user.daily_risk_assessment_check_6,
          dailyRiskAssessmentCheck7: user.daily_risk_assessment_check_7,
          dailyRiskAssessmentCheck8: user.daily_risk_assessment_check_8,
          dailyRiskAssessmentCheck9: user.daily_risk_assessment_check_9,
          dailyRiskAssessmentCheck10: user.daily_risk_assessment_check_10,
          dailyRiskAssessmentCheck11: user.daily_risk_assessment_check_11,
          dailyRiskAssessmentCheck12: user.daily_risk_assessment_check_12,
          dailyRiskAssessmentCheck13: user.daily_risk_assessment_check_13,
          dailyRiskAssessmentCheck14: user.daily_risk_assessment_check_14,
          dailyRiskAssessmentCheck15: user.daily_risk_assessment_check_15,
          dailyRiskAssessmentCheck16: user.daily_risk_assessment_check_16,
          dailyRiskAssessmentCheck17: user.daily_risk_assessment_check_17,
          dailyRiskAssessmentCheck18: user.daily_risk_assessment_check_18,
          dailyRiskAssessmentCheck19: user.daily_risk_assessment_check_19,
          dailyRiskAssessmentCheck20: user.daily_risk_assessment_check_20,
          dailyRiskAssessmentCheck21: user.daily_risk_assessment_check_21,
          dailyRiskAssessmentCheck22: user.daily_risk_assessment_check_22,
          dailyRiskAssessmentCheck23: user.daily_risk_assessment_check_23,
          dailyRiskAssessmentCheck24: user.daily_risk_assessment_check_24,
          dailyRiskAssessmentCheck25: user.daily_risk_assessment_check_25,
          dailyRiskAssessmentCheck26: user.daily_risk_assessment_check_26,
          dailyRiskAssessmentCheck27: user.daily_risk_assessment_check_27,
          dailyRiskAssessmentCheck28: user.daily_risk_assessment_check_28,
          dailyRiskAssessmentCheck29: user.daily_risk_assessment_check_29,
          dailyRiskAssessmentCheck30: user.daily_risk_assessment_check_30,
          dailyRiskAssessmentCheck31: user.daily_risk_assessment_check_31,
          dailyRiskAssessmentCheck32: user.daily_risk_assessment_check_32,
          dailyRiskAssessmentCheck33: user.daily_risk_assessment_check_33,
          dailyRiskAssessmentCheck34: user.daily_risk_assessment_check_34,
          isLoading: false
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  editChild() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('dailyRiskAssessment').doc(this.state.key);
    docUpdate.set({
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
    }).then(() => {
      this.setState({
        key: '',
        dailyRiskAssessmentDate: '',
        dailyRiskAssessmentIsCompleted: '',
        dailyRiskAssessmentNote: '',
        dailyRiskAssessmentCheck1: '',
        dailyRiskAssessmentCheck2: '',
        dailyRiskAssessmentCheck3: '',
        dailyRiskAssessmentCheck4: '',
        dailyRiskAssessmentCheck5: '',
        dailyRiskAssessmentCheck6: '',
        dailyRiskAssessmentCheck7: '',
        dailyRiskAssessmentCheck8: '',
        dailyRiskAssessmentCheck9: '',
        dailyRiskAssessmentCheck10: '',
        dailyRiskAssessmentCheck11: '',
        dailyRiskAssessmentCheck12: '',
        dailyRiskAssessmentCheck13: '',
        dailyRiskAssessmentCheck14: '',
        dailyRiskAssessmentCheck15: '',
        dailyRiskAssessmentCheck16: '',
        dailyRiskAssessmentCheck17: '',
        dailyRiskAssessmentCheck18: '',
        dailyRiskAssessmentCheck19: '',
        dailyRiskAssessmentCheck20: '',
        dailyRiskAssessmentCheck21: '',
        dailyRiskAssessmentCheck22: '',
        dailyRiskAssessmentCheck23: '',
        dailyRiskAssessmentCheck24: '',
        dailyRiskAssessmentCheck25: '',
        dailyRiskAssessmentCheck26: '',
        dailyRiskAssessmentCheck27: '',
        dailyRiskAssessmentCheck28: '',
        dailyRiskAssessmentCheck29: '',
        dailyRiskAssessmentCheck30: '',
        dailyRiskAssessmentCheck31: '',
        dailyRiskAssessmentCheck32: '',
        dailyRiskAssessmentCheck33: '',
        dailyRiskAssessmentCheck34: '',
        isLoading: false,
      });
      this.props.navigation.navigate('HealthSafetyChecks');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.dailyRiskAssessmentDate}</Text>
        <ScrollView>
          <View style={styles.space}></View>
          <View style={styles.bottomBorder}>
            <Text style={styles.headerText}>All Areas</Text>
            <Text style={[styles.bold, styles.space]}>Wires, Cables & Sockets</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck1}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck1')}
            />
            <Text style={styles.bold}>Floor clear - trips/spills</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck2}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck2')}
            />
            <Text style={styles.bold}>Radiator/hot water temperatures</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck3}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck3')}
            />
            <Text style={styles.bold}>Spare batteries out of reach</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck4}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck4')}
            />
            <Text style={styles.bold}>Plastic bags stored away</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck5}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck5')}
            />
            <Text style={styles.bold}>Air fresheners/candles out of reach</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck6}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck6')}
            />
            <Text style={styles.bold}>Medicines/painkillers stored away</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck7}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck7')}
            />
            <Text style={styles.bold}>Matches/lighters stored away</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck8}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck8')}
            />
            <Text style={styles.bold}>Furniture stable/equipment safe</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck9}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck9')}
            />
            <Text style={styles.bold}>Safety gates secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck10}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck10')}
            />
            <Text style={styles.bold}>Escape routes clear (keys safe)</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck11}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck11')}
            />
            <Text style={styles.bold}>Fire safety equipment checked/tested</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck12}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck12')}
            />
            <Text style={styles.bold}>Carbon monoxide alarm checked/tested</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck13}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck13')}
            />
          </View>
          <View style={styles.bottomBorder}>
            <Text style={[styles.headerText]}>Lounge/Play areas</Text>
            <Text style={styles.bold}>Toys/equipment clean and safe</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck14}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck14')}
            />
            <Text style={styles.bold}>Small toys out of reach babies/toddlers</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck15}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck15')}
            />
            <Text style={styles.bold}>Safety equipment secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck16}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck16')}
            />
            <Text style={styles.bold}>Window/blinds chords secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck17}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck17')}
            />
          </View>
          <View style={styles.bottomBorder}>
            <Text style={styles.headerText}>Kitchen/Eating area</Text>
            <Text style={styles.bold}>Clean and tidy</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck18}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck18')}
            />
            <Text style={styles.bold}>Cleaning products/alcohol secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck19}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck19')}
            />
            <Text style={styles.bold}>Knives/other hazards secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck20}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck20')}
            />
          </View>
          <View style={styles.bottomBorder}>
            <Text style={styles.headerText}>Toilet/Bathroom/Changing area</Text>
            <Text style={styles.bold}>Clean and tidy</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck21}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck21')}
            />
            <Text style={styles.bold}>Toiletries out of reach</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck22}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck22')}
            />
            <Text style={styles.bold}>Clean towels/paper towels</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck23}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck23')}
            />
            <Text style={styles.bold}>Toilet roll/wipes/nappy bags/gloves</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck24}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck24')}
            />
          </View>
            <Text style={styles.headerText}>Garden/outdoors/outings</Text>
            <Text style={styles.bold}>Gates locked/boundaries secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck25}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck25')}
            />
            <Text style={styles.bold}>Animal fouling</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck26}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck26')}
            />
            <Text style={styles.bold}>Trip hazards</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck27}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck27')}
            />
            <Text style={styles.bold}>Sharp objects/garden tools secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck28}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck28')}
            />
            <Text style={styles.bold}>Play equipment safe</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck29}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck29')}
            />
            <Text style={styles.bold}>Buggies/pushchairs/reins secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck30}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck30')}
            />
            <Text style={styles.bold}>Car seats - appropriate and secure</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck31}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck31')}
            />
            <Text style={styles.bold}>Outings risk assessment</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck32}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck32')}
            />
            <Text style={styles.bold}>Emergency contact details</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck33}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck33')}
            />
            <Text style={styles.bold}>First aid box</Text>
            <TextInput
                style={styles.input}
                value={this.state.dailyRiskAssessmentCheck34}
                onChangeText={(val) => this.inputEl(val, 'dailyRiskAssessmentCheck34')}
            />
            <View style={styles.space}></View>
            <Button
              title='Update'
              onPress={() => this.editChild()} 
              color="#0B8FDC"
            />
            <View style={styles.space}></View>
            <View style={styles.space}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DADADA'
  },
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  },
  bold: {
    fontWeight: 'bold'
  },
  space: {
    height: 20,
  },
  bottomBorder: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: "#DADADA",
    textAlign: 'center',
  }
})