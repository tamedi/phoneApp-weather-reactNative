import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
  }

  handleCityInput = (content) => {
    this.setState({city: content});
    console.log(content);
  };

  saveCity = async () => {
    try {
      await AsyncStorage.setItem('@weatherApp:city', this.state.city);
      Alert.alert('Ville sauvegardée:' + this.state.city);
    } catch (e) {
      Alert.alert(
        "Une erreur s'est produite lors de l'enregistrement de la ville.",
      );
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Réglages</Text>
          <View>
            <Text>Ville:</Text>
            <TextInput
              placeholder="Nom de la ville"
              onChangeText={this.handleCityInput}
              value={this.state.city}
            />
            <TouchableOpacity onPress={this.saveCity}>
              <Text>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Settings;
