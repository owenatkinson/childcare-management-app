import React, { useState } from "react";
import { View, Button } from "react-native";
import "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ListLogs from "./ListLogs";
import { convertDate } from "../../Components/Functionality";

// navigation parameter to navigate the user to a new page
export default function ViewLogs({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // When date value is changed via date picker, set the new value here
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  // Display the date picker
  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title={convertDate(date)} />
      </View>
      {show && (
        <DateTimePicker
          maximumDate={new Date()}
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onDateChange}
        />
      )}
      {/* ListLogs component used to list logs depending on changeDate variable */}
      <ListLogs navigation={navigation} changeDate={convertDate(date)}></ListLogs>
    </View>
  );
}
