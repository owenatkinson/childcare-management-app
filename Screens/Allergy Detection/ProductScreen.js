import React, { useState } from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import General from './Components/General';
import Ingredients from './Components/Ingredients';
import Allergens from './Components/Allergens';
import Nutrition from './Components/Nutrition';

export default function ProductScreen({ route }) {
  const [selectedIndex, updateIndex] = useState(0);
  const buttons = ['General', 'Ingredients','Nutrition', 'Allergens', 'Children']

  return (
    <View>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          height: 75
          }} />

        <View>
          { selectedIndex === 0 ? <General route={route}/> : false }
          { selectedIndex === 1 ? <Ingredients route={route}/> : false }
          { selectedIndex === 2 ? <Nutrition route={route}/> : false }
          { selectedIndex === 3 ? <Allergens route={route}/> : false }
        </View>
    </View>
  )
}