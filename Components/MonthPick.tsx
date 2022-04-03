import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { format, subMonths, addMonths } from "date-fns";
import * as styles from "../Styles/general";

type MonthPickerProps = {
  date: Date,
  onChange: (newDate: Date) => void,
};

const MonthPick: React.FC<MonthPickerProps> = ({ date, onChange }) => {
  // Reduce date by 1 month
  const handlePrev = () => {
    const newDate = subMonths(date, 1);
    onChange(newDate);
  };

  // Increase date by 1 month
  const handleNext = () => {
    const newDate = addMonths(date, 1);
    onChange(newDate);
  };

  return (
    <View style={styles.row}>
      <IconButton icon="arrow-left" onPress={handlePrev}></IconButton>
      <Text>{format(date, "MMMM, yyyy")}</Text>
      <IconButton icon="arrow-right" onPress={handleNext}></IconButton>
    </View>
  );
};

export default MonthPick;
