import { View, ImageBackground} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Items from './Components/HomeItems'
import Posts from './Components/HomePosts'
import Nav from './Components/Nav'
import { TextInput } from 'react-native';

const UsersHome = ({navigation}) => {
  const [search, setSearch] = useState("")
  const image = require("/Users/vinayasharma/Desktop/krish/screens/assets/back.png")
  return (
    <View>
      {/*<ImageBackground source={image} style={{width:'100%', height:'100%'}}>*/}
      <SafeAreaView style={{ backgroundColor:"#faf5e8", height:"100%"}}>
            <Nav navigation = {navigation} isCompany={true} />
    <View style = {{alignItems:'center'}} >
    <TextInput
        style={{marginTop:10,borderRadius:10,borderWidth:1, color:"green",borderColor:"#95c489",backgroundColor:'white',paddingRight:20,paddingLeft:20,height: 50, width:'90%'}}
        placeholder="Search.."
        onChangeText={newText => setSearch(newText)}
        defaultValue={search}
      />
        </View>
       <Items/>
       <View style={{marginTop:5}}>
       <Posts navigation = {navigation} search={search} />
       </View>
            
    </SafeAreaView>
    {/*</ImageBackground>*/}
    </View>
  );
  }

export default UsersHome;
