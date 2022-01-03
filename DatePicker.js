// import React, {useState} from 'react';
// import { View, Button, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function DatePicker() {
//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };
  
//   const showDatepicker = () => {
//     setShow(true);
//   };

//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Select a Date" />
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// }