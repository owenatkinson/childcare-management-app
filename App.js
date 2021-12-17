import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

function App() {
  return (
      <NavigationContainer>
        <StackNavigator></StackNavigator>
      </NavigationContainer>
  );
}

// const Buttons = (props) => {
//   return (
//     <View>
//        <Button
//           title={props.name}
//           style={styles.button}
//         />
//       <View style={styles.space}></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   fixToText: {
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//   },
//   space: {
//     height: 20,
//   }
// });

export default App;