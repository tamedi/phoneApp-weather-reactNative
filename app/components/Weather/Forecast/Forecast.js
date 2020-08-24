import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {},
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const dataFromStorageJSON = await AsyncStorage.getItem('forecast');
    console.log(dataFromStorageJSON);

    if (dataFromStorageJSON) {
      this.setState({forecast: JSON.parse(dataFromStorageJSON)});
    } else {
      this.getForecast();
    }
  };

  getForecast = () => {
    this.setState({refreshing: true});

    const options = {
      method: 'GET',
    };

    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=7524b547972909bbc321d4e184e23f48',
      options,
    )
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({forecast: data});
          this.storeData('forecast', JSON.stringify(data));
        },
        (error) => {
          console.log(error);
        },
      )
      .finally(() => {
        this.setState({refreshing: false});
      });
  };

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert(
        "Une erreur s'est produite lors de la sauvegarde des données météo",
      );
    }
  };

  showForecast = () => {
    if (Array.isArray(this.state.forecast.list)) {
      return this.state.forecast.list.map((element, index) => (
        <View key={index}>
          <Text>{element.dt_txt}</Text>
          <Text>Température minimale: {element.main.temp_min}</Text>
          <Text>Température maximale: {element.main.temp_max}</Text>
          <Text>Vitesse du vent: {element.wind.speed}</Text>
          <Text>Météo: {element.weather[0].description}</Text>
          <Image
            style={{height: 50, width: 50}}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                element.weather[0].icon +
                '@2x.png',
            }}
          />
        </View>
      ));
    } else {
      return <Text>Chargement en cours...</Text>;
    }
  };

  render() {
    return (
      <View>
        <StatusBar />
        <SafeAreaView>
          <Text>Météo des 5 prochains jours</Text>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getForecast}
              />
            }>
            {this.showForecast()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Forecast;
