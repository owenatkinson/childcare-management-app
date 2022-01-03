import React, { useState } from 'react';
import { View, Button } from 'react-native';
import "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ListLogs from './ListLogs';

export default function ViewLogs({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const convertDate = (dateInput) => {
    return(moment(dateInput).format('D/M/YY'));
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
      <ListLogs navigation={navigation} changeDate={convertDate(date)}></ListLogs>
    </View>
  );
}