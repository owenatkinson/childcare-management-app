import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import ManageChildren from './Screens/ManageChildren/ManageChildren';
import AllergyDetection from './Screens/Allergy Detection/AllergyDetection';
import ViewLogs from './Screens/View Logs/ViewLogs';
import ViewLogDetails from './Screens/View Logs/ViewLogDetails';
import VisitorLogs from './Screens/Visitor Logs/VisitorLogs';
import UpdateVisitorLog from './Screens/Visitor Logs/UpdateVisitorLog';
import LogVisitor from './Screens/Visitor Logs/LogVisitor';
import ViewVisitorLogs from './Screens/Visitor Logs/ViewVisitorLogs';
import MedicineAdministration from './Screens/MedicineAdministration/MedicineAdministration';
import LogMedicine from './Screens/MedicineAdministration/LogMedicine';
import UpdateMedicineLog from './Screens/MedicineAdministration/UpdateMedicineLog';
import ViewMedicalInfo from './Screens/MedicineAdministration/ViewMedicalInfo';
import FilePreview from './Screens/Policies/FilePreview';
import Policies from './Screens/Policies/Policies';
import Planner from './Screens/MedicineAdministration/MedicineAdministration';
import HealthSafetyChecks from './Screens/Health & Safety Checks/HealthSafetyChecks';
import DailyCovidAssessment from './Screens/Health & Safety Checks/DailyCovidAssessment';
import DailyRiskAssessment from './Screens/Health & Safety Checks/DailyRiskAssessment';
import MonthlyFireDrill from './Screens/Health & Safety Checks/MonthlyFireDrill';
import MonthlyFireSafetyEquipmentCheck from './Screens/Health & Safety Checks/MonthlyFireSafetyEquipmentCheck';
import AttendanceRegister from './Screens/Attendance Register/AttendanceRegister';
import AccidentReports from './Screens/Accident Report/AccidentReports';
import Finances from './Screens/Finances/Finances';
import AddNewChild from './Screens/ManageChildren/AddChildDetails';
import ViewChildren from './Screens/ManageChildren/ViewChildren';
import UpdateChildDetails from './Screens/ManageChildren/UpdateChildDetails';
import LogAccidentReport from './Screens/Accident Report/LogAccidentReport';
import ViewAccidentReports from './Screens/Accident Report/ViewAccidentReports';
import UpdateAccidentReport from './Screens/Accident Report/UpdateAccidentReport';
import ViewInactiveChildren from './Screens/ManageChildren/ViewInactiveChildren';
import AddDailyCovidAssessment from './Screens/Health & Safety Checks/AddChecks/AddDailyCovidAssessment';
import AddDailyRiskAssessment from './Screens/Health & Safety Checks/AddChecks/AddDailyRiskAssessment';
import AddMonthlyDrillList from './Screens/Health & Safety Checks/AddChecks/AddMonthlyDrillList';
import AddMonthlyFireSafetyEquipmentList from './Screens/Health & Safety Checks/AddChecks/AddMonthlyFireSafetyEquipmentList';
import LogExpense from './Screens/Finances/Expenses/LogExpense';
import ViewExpenses from './Screens/Finances/Expenses/ViewExpenses';
import UpdateExpense from './Screens/Finances/Expenses/UpdateExpense';
import ReceiptPreview from './Screens/Finances/ReceiptPreview';
import LogInvoice from './Screens/Finances/Invoices/LogInvoice';
import UpdateInvoice from './Screens/Finances/Invoices/UpdateInvoice';
import ViewInvoice from './Screens/Finances/Invoices/ViewInvoice';
import LogMiles from './Screens/Finances/Mileage/LogMiles';
import UpdateMiles from './Screens/Finances/Mileage/UpdateMiles';
import ViewMiles from './Screens/Finances/Mileage/ViewMiles';
import ProductScreen from './Screens/Allergy Detection/ProductScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#0B64A9'},
            headerTitleStyle: {color: '#fff', fontWeight: 'bold', fontSize: 22}}}>
          <Stack.Screen name="Home" component={Home} options={{title: 'My Childcare App'}}/>
          <Stack.Screen name="Allergy" component={AllergyDetection} options={{ title: 'Allergy Detection'}}/>
          <Stack.Screen name="VisitorLogs" component={VisitorLogs} options={{ title: 'Visitor Logs'}}/>
          <Stack.Screen name="ViewLogs" component={ViewLogs} options={{ title: 'View Daily Logs'}}/>
          <Stack.Screen name="ViewLogDetails" component={ViewLogDetails} options={{ title: 'View Log Details'}}/>
          <Stack.Screen name="MedicineAdministration" component={MedicineAdministration} options={{ title: 'Medicine Administration'}}/>
          <Stack.Screen name="LogMedicine" component={LogMedicine} options={{ title: 'Log Medicical Info'}}/>
          <Stack.Screen name="UpdateMedicineLog" component={UpdateMedicineLog} options={{ title: 'Update Medicine Info'}}/>
          <Stack.Screen name="ViewMedicalInfo" component={ViewMedicalInfo} options={{ title: 'View Medicine Info'}}/>
          <Stack.Screen name="Planner" component={Planner} options={{ title: 'Planner'}}/>
          <Stack.Screen name="HealthSafetyChecks" component={HealthSafetyChecks} options={{ title: 'Health & Safety Checks'}}/>
          <Stack.Screen name="DailyCovidAssessment" component={DailyCovidAssessment} options={{ title: 'COVID Assessment'}}/>
          <Stack.Screen name="AddDailyCovidAssessment" component={AddDailyCovidAssessment} options={{ title: 'COVID Assessment'}}/>
          <Stack.Screen name="AddDailyRiskAssessment" component={AddDailyRiskAssessment} options={{ title: 'Risk Assessment'}}/>
          <Stack.Screen name="AddMonthlyDrillList" component={AddMonthlyDrillList} options={{ title: 'Fire Drill'}}/>
          <Stack.Screen name="AddMonthlyFireSafetyEquipmentList" component={AddMonthlyFireSafetyEquipmentList} options={{ title: 'Fire Safety Equipment Check'}}/>
          <Stack.Screen name="DailyRiskAssessment" component={DailyRiskAssessment} options={{ title: 'Risk Assessment'}}/>
          <Stack.Screen name="MonthlyFireDrill" component={MonthlyFireDrill} options={{ title: 'Fire Drill'}}/>
          <Stack.Screen name="MonthlyFireSafetyEquipmentCheck" component={MonthlyFireSafetyEquipmentCheck} options={{ title: 'Fire Safety Equipment Check'}}/>
          <Stack.Screen name="Attendance" component={AttendanceRegister} options={{ title: 'Attendance Register'}}/>
          <Stack.Screen name="ManageChildren" component={ManageChildren} options={{ title: 'Manage Children'}}/>
          <Stack.Screen name="AddNewChild" component={AddNewChild} options={{ title: 'Add New Child'}}/>
          <Stack.Screen name="ViewChildren" component={ViewChildren} options={{ title: 'View Active Children'}}/>
          <Stack.Screen name="ViewInactiveChildren" component={ViewInactiveChildren} options={{ title: 'View Inactive Children'}}/>
          <Stack.Screen name="UpdateChildDetails" component={UpdateChildDetails} options={{ title: 'Update Child Details'}}/>
          <Stack.Screen name="AccidentReports" component={AccidentReports} options={{ title: 'Accident Reports'}}/>
          <Stack.Screen name="LogAccidentReport" component={LogAccidentReport} options={{ title: 'Log Accident Reports'}}/>
          <Stack.Screen name="ViewAccidentReports" component={ViewAccidentReports} options={{ title: 'View Accident Reports'}}/>
          <Stack.Screen name="UpdateAccidentReport" component={UpdateAccidentReport} options={{ title: 'Update Accident Report'}}/>
          <Stack.Screen name="Finances" component={Finances} options={{ title: 'Finances'}}/>
          <Stack.Screen name="UpdateVisitorLog" component={UpdateVisitorLog} options={{ title: 'Update Visitor Log'}}/>
          <Stack.Screen name="LogVisitor" component={LogVisitor} options={{ title: 'Log Visitor'}}/>
          <Stack.Screen name="ViewVisitorLogs" component={ViewVisitorLogs} options={{ title: 'View Visitor Logs'}}/>
          <Stack.Screen name="Policies" component={Policies} options={{ title: 'Policies'}}/>
          <Stack.Screen name="FilePreview" component={FilePreview} options={{ title: 'View Policy'}}/>
          <Stack.Screen name="LogExpense" component={LogExpense} options={{ title: 'Log Expense'}}/>
          <Stack.Screen name="ViewExpenses" component={ViewExpenses} options={{ title: 'View Expenses'}}/>
          <Stack.Screen name="UpdateExpense" component={UpdateExpense} options={{ title: 'Update Expense'}}/>
          <Stack.Screen name="ReceiptPreview" component={ReceiptPreview} options={{ title: 'Receipt Preview'}}/>
          <Stack.Screen name="LogInvoice" component={LogInvoice} options={{ title: 'Log Invoice'}}/>
          <Stack.Screen name="ViewInvoice" component={ViewInvoice} options={{ title: 'View Invoice'}}/>
          <Stack.Screen name="UpdateInvoice" component={UpdateInvoice} options={{ title: 'Update Invoice'}}/>
          <Stack.Screen name="LogMiles" component={LogMiles} options={{ title: 'Log Mileage'}}/>
          <Stack.Screen name="ViewMiles" component={ViewMiles} options={{ title: 'View Mileage Logs'}}/>
          <Stack.Screen name="UpdateMiles" component={UpdateMiles} options={{ title: 'Update Mileage Log'}}/>
          <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ title: 'Product Information'}}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;