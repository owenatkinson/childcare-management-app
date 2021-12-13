import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Date from './Date';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageChildren from './Screens/ManageChildren/ManageChildren';
import AllergyDetection from './Screens/AllergyDetection';
import ViewLogs from './Screens/ViewLogs';
import VisitorLogs from './Screens/VisitorLogs';
import Policies from './Screens/Policies';
import Planner from './Screens/Planner';
import HealthSafetyChecks from './Screens/HealthSafetyChecks';
import AttendanceRegister from './Screens/Attendance Register/AttendanceRegister';
import AccidentReports from './Screens/Accident Report/AccidentReports';
import Finances from './Screens/Finances';
import AddNewChild from './Screens/ManageChildren/AddChildDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#0B64A9'},
            headerTitleStyle: {color: '#fff', fontWeight: 'bold', fontSize: 22}}}>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'My Childcare App'}}/>
          <Stack.Screen name="Allergy" component={AllergyDetection} options={{ title: 'Allergy Detection'}}/>
          <Stack.Screen name="Visitor" component={VisitorLogs} options={{ title: 'Visitor Logs'}}/>
          <Stack.Screen name="ViewLogs" component={ViewLogs} options={{ title: 'View Daily Logs'}}/>
          <Stack.Screen name="Policies" component={Policies} options={{ title: 'Policies'}}/>
          <Stack.Screen name="Planner" component={Planner} options={{ title: 'Planner'}}/>
          <Stack.Screen name="HealthSafetyChecks" component={HealthSafetyChecks} options={{ title: 'Health & Safety Checks'}}/>
          <Stack.Screen name="Attendance" component={AttendanceRegister} options={{ title: 'Attendance Register'}}/>
          <Stack.Screen name="Children" component={ManageChildren} options={{ title: 'Manage Children'}}/>
          <Stack.Screen name="Accident" component={AccidentReports} options={{ title: 'Accident Reports'}}/>
          <Stack.Screen name="Finances" component={AddNewChild} options={{ title: 'Finances'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View>
        <Date></Date>
        <View style={styles.fixToText}>
          <Button 
            title="Attendance Register"
            onPress={() => navigation.navigate('Attendance')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Health & Safety Checks"
            onPress={() => navigation.navigate('HealthSafetyChecks')}
          />
          <View style={styles.space}></View>
          <Button
            title="Planner"
            onPress={() => navigation.navigate('Planner')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Manage Children"
            onPress={() => navigation.navigate('Children')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Policies"
            onPress={() => navigation.navigate('Policies')}
          />
          <View style={styles.space}></View>
          <Button 
            title="Finances"
            onPress={() => navigation.navigate('Finances')}
          />
          <View style={styles.space}></View>
          <Button
            title="Allergy Detection"
            onPress={() => navigation.navigate('Allergy')}
          />
          <View style={styles.space}></View>
          <Button
            title="Accident Reports"
            onPress={() => navigation.navigate('Accident')}
          />
          <View style={styles.space}></View>
          <Button
            title="View Logs"
            onPress={() => navigation.navigate('ViewLogs')}
          />
          <View style={styles.space}></View>
          <Button
            title="Visitor Logs"
            onPress={() => navigation.navigate('Visitor')}
          />
        </View>
      </View>
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

const styles = StyleSheet.create({
  fixToText: {
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  space: {
    height: 20,
  }
});

export default App;