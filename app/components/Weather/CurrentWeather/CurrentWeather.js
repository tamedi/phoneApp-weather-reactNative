import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    let city = 'Nice';
    try {
      city = await AsyncStorage.getItem('@weatherApp:city');
      if (!city) {
        city = 'Nice';
      }
    } catch (e) {
      Alert.alert(
        "Une erreur s'est produite lors de la récupération de la ville.",
      );
    }

    Alert.alert('Météo de ' + city);

    const options = {
      method: 'GET',
    };

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=7524b547972909bbc321d4e184e23f48',
      options,
    )
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({forecast: data});
        },
        (error) => {
          console.log(error);
        },
      );
  };

  showForecast = () => {
    if (this.state.forecast) {
      return (
        <View>
          <Text>
            Température: {Number(this.state.forecast.main.temp) - 273.15}
          </Text>
          <Text>Météo: {this.state.forecast.weather[0].main}</Text>
          <Image
            style={{height: 50, width: 50}}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                this.state.forecast.weather[0].icon +
                '@2x.png',
            }}
          />
        </View>
      );
    } else {
      return <Text>Chargement en cours...</Text>;
    }
  };

  render() {
    return (
      <View>
        <StatusBar />
        <SafeAreaView>
          <Text>Météo du jour</Text>
          {this.showForecast()}
        </SafeAreaView>
      </View>
    );
  }
}

export default CurrentWeather;
