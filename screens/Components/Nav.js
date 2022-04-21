import { View, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth} from "../Firebase"
import {signOut} from 'firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Nav = ({navigation, isCompany}) => {
  const logo = require('/Users/vinayasharma/Desktop/krish/screens/assets/theLogo.png')

  const handleLogin = () => {
   signOut(auth)
}

  return (
      <View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row' , marginTop:5,marginBottom:5 , marginHorizontal:3, paddingHorizontal:25}}>
      {/*<Image source={logo} style={{zIndex:999, width:140, height:43}}></Image>*/}
      <Image source={logo} style={{width:150, height:80}}></Image>
      <View style={{flexDirection:'row', marginTop:13, marginLeft:"auto"}}>
      <TouchableOpacity onPress={handleLogin} style={{marginRight:10}} >
      <Icon color={"#e88e07"} size={30} name='person-circle-outline' />
      </TouchableOpacity>
      {isCompany && (
         <TouchableOpacity onPress={() => navigation.push('Cart')}>
         <Icon name='ios-cart' size={30} color='#e88e07'/>
         </TouchableOpacity>)
      }
      </View>
      </View>
  );
};

export default Nav;
