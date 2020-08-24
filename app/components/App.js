import React, {Component} from 'react';
import {View, Text, SafeAreaView, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Weather from './Weather/Weather';
import News from './News/News';
import Settings from './Settings/Settings';

const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      splashscreen: true,
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({splashscreen: false});
    }, 4000);

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
    }).start();

    Animated.timing(this.state.rotation, {
      toValue: 360,
      duration: 2000,
      delay: 2000,
    }).start();
  }

  render() {
    if (this.state.splashscreen) {
      return (
        <View style={{backgroundColor: '#38A2DB', flex: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Animated.View
              style={{
                opacity: this.state.opacity,
                transform: [{rotate: this.state.rotation + 'deg'}],
              }}>
              <Icon
                name="sunny"
                color="#FFFFFF"
                size={150}
                style={{textAlign: 'center'}}
              />
            </Animated.View>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontSize: 50,
              flex: 1,
              fontWeight: '300',
            }}>
            Mon app météo
          </Text>
        </View>
      );
    } else if (!this.state.isLoggedIn) {
      return (
        <SafeAreaView>
          <View>
            <Text>Connectez vous</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <NavigationContainer>
          {/* Router */}

          {/* Switch */}
          <Drawer.Navigator>
            <Drawer.Screen
              options={{
                drawerLabel: 'Météo',
                drawerIcon: ({color, size}) => (
                  <Icon name="sunny" color={color} size={size} />
                ),
              }}
              name="weather"
              component={Weather}
            />
            <Drawer.Screen name="news" component={News} />
            <Drawer.Screen name="Réglages" component={Settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default App;
