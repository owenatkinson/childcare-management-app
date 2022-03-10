import React, {useState} from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DailyCovidList from './CheckLists/DailyCovidList';
import DailyRiskList from './CheckLists/DailyRiskList';
import MonthlyDrillList from './CheckLists/MonthlyDrillList';
import MonthlyFireSafetyEquipmentList from './CheckLists/MonthlyFireSafetyEquipmentList';

export default function HealthSafetyChecks({ navigation }) {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YYYY'));
  }

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title={convertDate(date)} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <DailyCovidList navigation={navigation} changeDate={convertDate(date)}></DailyCovidList>
      </View>
      <View>
        <DailyRiskList navigation={navigation} changeDate={convertDate(date)}></DailyRiskList>
      </View>
      <View>
        <MonthlyDrillList navigation={navigation} changeDate={convertDate(date)}></MonthlyDrillList>
      </View>
      <View>
        <MonthlyFireSafetyEquipmentList navigation={navigation} changeDate={convertDate(date)}></MonthlyFireSafetyEquipmentList>
      </View>
    </View>
  );
}