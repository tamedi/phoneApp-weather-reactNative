import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import Forecast from './Forecast/Forecast';
import Icon from 'react-native-vector-icons/Octicons';

const Tabs = createBottomTabNavigator();

class Weather extends Component {
  render() {
    return (
      <Tabs.Navigator>
        <Tabs.Screen
          name="Current"
          component={CurrentWeather}
          options={{
            tabBarLabel: 'Météo du jour',
            tabBarIcon: ({color, size}) => (
              <Icon name="sync" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen name="Forecast" component={Forecast} />
      </Tabs.Navigator>
    );
  }
}

export default Weather;
