import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import style from './style';

class News extends Component {
  cacahuete = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          {/* Barre de titre */}
          <View style={style.titleBar}>
            <Text style={style.title}>Les Actus</Text>
          </View>

          <View>
            <View style={[style.content, style.content1]}>
              <Text style={style.text}>Content 1</Text>
            </View>

            <View style={[style.content, style.content2]}>
              <Text style={style.text}>Content 2</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default News;
