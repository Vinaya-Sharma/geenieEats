import { View, Text } from 'react-native';
import React from 'react';
import Nav from './Components/Nav';
import Home from './Home';
import { SafeAreaView } from 'react-native-safe-area-context';

const EveryoneHome = ({navigation}) => {
  return (
      <SafeAreaView>
            <Home navigation={navigation} />
      </SafeAreaView>
  );
};

export default EveryoneHome;
