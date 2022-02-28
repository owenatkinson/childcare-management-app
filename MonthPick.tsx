import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import {format, subMonths, addMonths} from 'date-fns';

type MonthPickerProps = {
  date: Date;
  onChange: (newDate: Date) => void;
}

const MonthPick: React.FC<MonthPickerProps> = ({date, onChange}) => {
  const handlePrev = () => {
    const newDate = subMonths(date, 1);
    onChange(newDate);
  };

  const handleNext = () => {
    const newDate = addMonths(date, 1);
    onChange(newDate);
  };

  return (
    <View style={styles.row}>
        <IconButton icon="arrow-left" onPress={handlePrev}></IconButton>
        <Text>{format(date, 'MMMM, yyyy')}</Text>
        <IconButton icon="arrow-right" onPress={handleNext}></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
});

export default MonthPick;