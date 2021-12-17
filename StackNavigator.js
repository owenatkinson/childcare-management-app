import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
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
import LoadChildren from './LoadChildren';
import UpdateChildDetails from './Screens/ManageChildren/UpdateChildDetails';
import LogAccidentReport from './Screens/Accident Report/LogAccidentReport';
import ViewAccidentReports from './Screens/Accident Report/ViewAccidentReports';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#0B64A9'},
            headerTitleStyle: {color: '#fff', fontWeight: 'bold', fontSize: 22}}}>
          <Stack.Screen name="Home" component={Home} options={{title: 'My Childcare App'}}/>
          <Stack.Screen name="Allergy" component={AllergyDetection} options={{ title: 'Allergy Detection'}}/>
          <Stack.Screen name="Visitor" component={VisitorLogs} options={{ title: 'Visitor Logs'}}/>
          <Stack.Screen name="ViewLogs" component={ViewLogs} options={{ title: 'View Daily Logs'}}/>
          <Stack.Screen name="Policies" component={Policies} options={{ title: 'Policies'}}/>
          <Stack.Screen name="Planner" component={Planner} options={{ title: 'Planner'}}/>
          <Stack.Screen name="HealthSafetyChecks" component={HealthSafetyChecks} options={{ title: 'Health & Safety Checks'}}/>
          <Stack.Screen name="Attendance" component={AttendanceRegister} options={{ title: 'Attendance Register'}}/>
          <Stack.Screen name="Children" component={ManageChildren} options={{ title: 'Manage Children'}}/>
          <Stack.Screen name="AddNewChild" component={AddNewChild} options={{ title: 'Add New Child'}}/>
          <Stack.Screen name="ViewChildren" component={LoadChildren} options={{ title: 'View Children'}}/>
          <Stack.Screen name="UpdateChildDetails" component={UpdateChildDetails} options={{ title: 'Update Child Details'}}/>
          <Stack.Screen name="Accident" component={AccidentReports} options={{ title: 'Accident Reports'}}/>
          <Stack.Screen name="LogAccidentReport" component={LogAccidentReport} options={{ title: 'Log Accident Reports'}}/>
          <Stack.Screen name="ViewAccidentReports" component={ViewAccidentReports} options={{ title: 'View Accident Reports'}}/>
          <Stack.Screen name="Finances" component={Finances} options={{ title: 'Finances'}}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;