import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DailyCovidList from "./CheckLists/DailyCovidList";
import DailyRiskList from "./CheckLists/DailyRiskList";
import MonthlyDrillList from "./CheckLists/MonthlyDrillList";
import MonthlyFireSafetyEquipmentList from "./CheckLists/MonthlyFireSafetyEquipmentList";
import { convertDate } from "../../Components/Functionality";

// navigation parameter to navigate the user to a new page
export default function HealthSafetyChecks({ navigation }) {
  // Initialising the state value of variables for the date picker
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
