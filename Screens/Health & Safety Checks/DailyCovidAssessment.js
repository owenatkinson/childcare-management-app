import React, { Component } from 'react';
import { Button, View, ScrollView, Alert, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import app from '../../firebase';
import "firebase/firestore";
const styles = require('../../Styles/general');

export default class DailyCovidAssessment extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dailyCovidAssessmentDate: '',
      dailyCovidAssessmentIsCompleted: '',
      dailyCovidAssessmentNote: '',
      dailyCovidAssessmentCheck1: '',
      dailyCovidAssessmentCheck2: '',
      dailyCovidAssessmentCheck3: '',
      dailyCovidAssessmentCheck4: '',
      dailyCovidAssessmentCheck5: '',
      dailyCovidAssessmentCheck6: '',
      dailyCovidAssessmentCheck7: '',
      dailyCovidAssessmentCheck8: '',
      dailyCovidAssessmentCheck9: '',
      dailyCovidAssessmentCheck10: '',
      dailyCovidAssessmentCheck11: '',
      dailyCovidAssessmentCheck12: '',
      dailyCovidAssessmentCheck13: '',
      dailyCovidAssessmentCheck14: '',
      dailyCovidAssessmentCheck15: '',
      dailyCovidAssessmentCheck16: '',
      dailyCovidAssessmentCheck17: '',
      dailyCovidAssessmentCheck18: '',
      dailyCovidAssessmentCheck19: '',
      dailyCovidAssessmentCheck20: '',
      dailyCovidAssessmentCheck21: '',
      dailyCovidAssessmentCheck22: '',
      dailyCovidAssessmentCheck23: '',
      dailyCovidAssessmentCheck24: '',
      dailyCovidAssessmentCheck25: '',
      dailyCovidAssessmentCheck26: '',
      dailyCovidAssessmentCheck27: '',
      dailyCovidAssessmentCheck28: '',
      dailyCovidAssessmentCheck29: '',
      dailyCovidAssessmentCheck30: ''
    };
  }

  componentDidMount() {
    const docRef = app.firestore().collection('dailyCovidAssessment').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          dailyCovidAssessmentDate: user.daily_covid_assessment_date,
          dailyCovidAssessmentIsCompleted: user.daily_covid_assessment_is_completed,
          dailyCovidAssessmentNote: user.daily_covid_assessment_note,
          dailyCovidAssessmentCheck1: user.daily_covid_assessment_check_1,
          dailyCovidAssessmentCheck2: user.daily_covid_assessment_check_2,
          dailyCovidAssessmentCheck3: user.daily_covid_assessment_check_3,
          dailyCovidAssessmentCheck4: user.daily_covid_assessment_check_4,
          dailyCovidAssessmentCheck5: user.daily_covid_assessment_check_5,
          dailyCovidAssessmentCheck6: user.daily_covid_assessment_check_6,
          dailyCovidAssessmentCheck7: user.daily_covid_assessment_check_7,
          dailyCovidAssessmentCheck8: user.daily_covid_assessment_check_8,
          dailyCovidAssessmentCheck9: user.daily_covid_assessment_check_9,
          dailyCovidAssessmentCheck10: user.daily_covid_assessment_check_10,
          dailyCovidAssessmentCheck11: user.daily_covid_assessment_check_11,
          dailyCovidAssessmentCheck12: user.daily_covid_assessment_check_12,
          dailyCovidAssessmentCheck13: user.daily_covid_assessment_check_13,
          dailyCovidAssessmentCheck14: user.daily_covid_assessment_check_14,
          dailyCovidAssessmentCheck15: user.daily_covid_assessment_check_15,
          dailyCovidAssessmentCheck16: user.daily_covid_assessment_check_16,
          dailyCovidAssessmentCheck17: user.daily_covid_assessment_check_17,
          dailyCovidAssessmentCheck18: user.daily_covid_assessment_check_18,
          dailyCovidAssessmentCheck19: user.daily_covid_assessment_check_19,
          dailyCovidAssessmentCheck20: user.daily_covid_assessment_check_20,
          dailyCovidAssessmentCheck21: user.daily_covid_assessment_check_21,
          dailyCovidAssessmentCheck22: user.daily_covid_assessment_check_22,
          dailyCovidAssessmentCheck23: user.daily_covid_assessment_check_23,
          dailyCovidAssessmentCheck24: user.daily_covid_assessment_check_24,
          dailyCovidAssessmentCheck25: user.daily_covid_assessment_check_25,
          dailyCovidAssessmentCheck26: user.daily_covid_assessment_check_26,
          dailyCovidAssessmentCheck27: user.daily_covid_assessment_check_27,
          dailyCovidAssessmentCheck28: user.daily_covid_assessment_check_28,
          dailyCovidAssessmentCheck29: user.daily_covid_assessment_check_29,
          dailyCovidAssessmentCheck30: user.daily_covid_assessment_check_30,
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

  editCheck() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = app.firestore().collection('dailyCovidAssessment').doc(this.state.key);
    docUpdate.set({
      daily_covid_assessment_date: this.state.dailyCovidAssessmentDate,
      daily_covid_assessment_is_completed: this.state.dailyCovidAssessmentIsCompleted,
      daily_covid_assessment_note: this.state.dailyCovidAssessmentNote,
      daily_covid_assessment_check_1: this.state.dailyCovidAssessmentCheck1,
      daily_covid_assessment_check_2: this.state.dailyCovidAssessmentCheck2,
      daily_covid_assessment_check_3: this.state.dailyCovidAssessmentCheck3,
      daily_covid_assessment_check_4: this.state.dailyCovidAssessmentCheck4,
      daily_covid_assessment_check_5: this.state.dailyCovidAssessmentCheck5,
      daily_covid_assessment_check_6: this.state.dailyCovidAssessmentCheck6,
      daily_covid_assessment_check_7: this.state.dailyCovidAssessmentCheck7,
      daily_covid_assessment_check_8: this.state.dailyCovidAssessmentCheck8,
      daily_covid_assessment_check_9: this.state.dailyCovidAssessmentCheck9,
      daily_covid_assessment_check_10: this.state.dailyCovidAssessmentCheck10,
      daily_covid_assessment_check_11: this.state.dailyCovidAssessmentCheck11,
      daily_covid_assessment_check_12: this.state.dailyCovidAssessmentCheck12,
      daily_covid_assessment_check_13: this.state.dailyCovidAssessmentCheck13,
      daily_covid_assessment_check_14: this.state.dailyCovidAssessmentCheck14,
      daily_covid_assessment_check_15: this.state.dailyCovidAssessmentCheck15,
      daily_covid_assessment_check_16: this.state.dailyCovidAssessmentCheck16,
      daily_covid_assessment_check_17: this.state.dailyCovidAssessmentCheck17,
      daily_covid_assessment_check_18: this.state.dailyCovidAssessmentCheck18,
      daily_covid_assessment_check_19: this.state.dailyCovidAssessmentCheck19,
      daily_covid_assessment_check_20: this.state.dailyCovidAssessmentCheck20,
      daily_covid_assessment_check_21: this.state.dailyCovidAssessmentCheck21,
      daily_covid_assessment_check_22: this.state.dailyCovidAssessmentCheck22,
      daily_covid_assessment_check_23: this.state.dailyCovidAssessmentCheck23,
      daily_covid_assessment_check_24: this.state.dailyCovidAssessmentCheck24,
      daily_covid_assessment_check_25: this.state.dailyCovidAssessmentCheck25,
      daily_covid_assessment_check_26: this.state.dailyCovidAssessmentCheck26,
      daily_covid_assessment_check_27: this.state.dailyCovidAssessmentCheck27,
      daily_covid_assessment_check_28: this.state.dailyCovidAssessmentCheck28,
      daily_covid_assessment_check_29: this.state.dailyCovidAssessmentCheck29,
      daily_covid_assessment_check_30: this.state.dailyCovidAssessmentCheck30,
    }).then(() => {
      this.setState({
        key: '',
        dailyCovidAssessmentDate: '',
        dailyCovidAssessmentIsCompleted: '',
        dailyCovidAssessmentNote: '',
        dailyCovidAssessmentCheck1: '',
        dailyCovidAssessmentCheck2: '',
        dailyCovidAssessmentCheck3: '',
        dailyCovidAssessmentCheck4: '',
        dailyCovidAssessmentCheck5: '',
        dailyCovidAssessmentCheck6: '',
        dailyCovidAssessmentCheck7: '',
        dailyCovidAssessmentCheck8: '',
        dailyCovidAssessmentCheck9: '',
        dailyCovidAssessmentCheck10: '',
        dailyCovidAssessmentCheck11: '',
        dailyCovidAssessmentCheck12: '',
        dailyCovidAssessmentCheck13: '',
        dailyCovidAssessmentCheck14: '',
        dailyCovidAssessmentCheck15: '',
        dailyCovidAssessmentCheck16: '',
        dailyCovidAssessmentCheck17: '',
        dailyCovidAssessmentCheck18: '',
        dailyCovidAssessmentCheck19: '',
        dailyCovidAssessmentCheck20: '',
        dailyCovidAssessmentCheck21: '',
        dailyCovidAssessmentCheck22: '',
        dailyCovidAssessmentCheck23: '',
        dailyCovidAssessmentCheck24: '',
        dailyCovidAssessmentCheck25: '',
        dailyCovidAssessmentCheck26: '',
        dailyCovidAssessmentCheck27: '',
        dailyCovidAssessmentCheck28: '',
        dailyCovidAssessmentCheck29: '',
        dailyCovidAssessmentCheck30: '',
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

  deleteChild() {
    const docRef = app.firestore().collection('dailyCovidAssessment').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          console.log('Doc deleted.')
          this.props.navigation.navigate('HealthSafetyChecks');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteChild()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    return (
      <View>
        <View style={styles.titleHeader}>
          <Text style={styles.buttonText}>{this.state.dailyCovidAssessmentDate}</Text>
        </View>
        <ScrollView>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Children put into childminder's care at the door:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck1}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck1')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Staggered drop off & pick up:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck2}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck2')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Ask if parents or siblings have symptoms:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck3}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck3')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Coats & shoes off:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck4}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck4')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Wash hands with soap & water:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck5}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck5')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Open windows/doors for ventilation when possible:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck6}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck6')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Review Risk Assessment regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck7}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck7')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Cleaning of toilet, taps, switch & handles:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck8}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck8')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Wash hands before & after using toilet:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck9}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck9')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Individual hand towels/flannels/paper towels used:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck10}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck10')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Liquid soap available & bottle cleaned regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck11}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck11')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Wash hands before & after outdoor play:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck12}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck12')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Sanitiser & wipes taken on outings:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck13}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck13')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Clean outdoor equipment regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck14}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck14')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Record of outings away from childminder's home:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck15}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck15')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Chairs & high chairs sanitised regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck16}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck16')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Surfaces cleaned regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck17}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck17')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <Text style={styles.standardText}>(Floors, surfaces, handles, light switches)</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Toys wiped when necessary:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck18}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck18')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <Text style={styles.standardText}>(Deep-cleaned once per day)</Text>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Limit toys and rotate:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck19}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck19')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Tissues & wipes readily available:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck20}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck20')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Bedding changed daily:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck21}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck21')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Bins wiped & emptied daily:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck22}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck22')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Any temperatures taken must be recorded:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck23}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck23')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Hands washed before getting into the car:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck24}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck24')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Seatbelts, handles & car seats cleaned regularly:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck25}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck25')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Children spaced as much as possible:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck26}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck26')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Air con switched off where possible:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck27}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck27')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Windows open for ventilation:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck28}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck28')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>No food/drink consumed in car:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck29}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck29')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.horizontalRule}></View>
          <View style={styles.checkBoxPositioning}>
            <Text style={styles.bold}>Wipes, tissues & hand sanitiser available:</Text>
            <CheckBox
              style={styles.checkBoxAlignRight}
              value={this.state.dailyCovidAssessmentCheck30}
              onValueChange={(val) => this.inputEl(val, 'dailyCovidAssessmentCheck30')}
              tintColors={{ true: "#0B8FDC", false: "orange"}}
            />
          </View>
          <View style={styles.space}></View>
          <Button
            title='Update'
            onPress={() => this.editCheck()} 
            color="#0B8FDC"
          />
          <View style={styles.space}></View>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </ScrollView>
      </View>
    );
  }
}