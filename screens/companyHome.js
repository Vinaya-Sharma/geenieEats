import { View, Text, ViewPropTypes, Touchable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Nav from './Components/Nav'
import { SafeAreaView } from 'react-native-safe-area-context';
import UsersHome from './UsersHome'

const CompanyHome = ({navigation}) => {

  return (
    <View>
       <UsersHome navigation={navigation} />
    </View>
  );
};

export default CompanyHome;

/* width: '100%',
height: 50,
backgroundColor: '#EE5407',
justifyContent: 'center',
alignItems: 'center',
position: 'absolute', 
bottom: 0, flexDirection:'row'*/