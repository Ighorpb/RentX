import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { color } from 'react-native-reanimated';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, cardStyle: {backgroundColor: 'black'}}}>
            <Screen name='Splash' component={Splash} />
            <Screen name='Home' component={Home} />
            <Screen name='MyCars' component={MyCars} />
            <Screen name='CarDetails' component={CarDetails} />
            <Screen name='Scheduling' component={Scheduling} />
            <Screen name='SchedulingComplete' component={SchedulingComplete} />
            <Screen name='SchedulingDetails' component={SchedulingDetails} />
        </Navigator>
    );
}
