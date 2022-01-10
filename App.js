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

export default App;