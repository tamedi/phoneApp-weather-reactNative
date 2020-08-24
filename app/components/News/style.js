import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#DFDFDF',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  titleBar: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    flex: 1,
  },

  content: {
    padding: 5,
  },

  text: {
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 25,
  },

  content1: {
    backgroundColor: '#EA45AA',
  },

  content2: {
    backgroundColor: '#45AD25',
  },
});

export default style;
