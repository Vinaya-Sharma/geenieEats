import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, View , Image, Alert, ImageBackground} from 'react-native';
import Checkbox from 'expo-checkbox';
import {auth, db} from './Firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import DropDownPicker from 'react-native-dropdown-picker';
import Multiselect from 'multiselect-react-dropdown';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [businessImg, setBusinessImg] = useState("")
    const image = {uri: "https://images.pexels.com/photos/10830530/pexels-photo-10830530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
    const logo = require('/Users/vinayasharma/Desktop/krish/screens/assets/theLogo.png')
    const PLACEHOLDER = "https://thumbs.dreamstime.com/b/placeholder-rgb-color-icon-image-gallery-photo-thumbnail-available-album-digital-media-multimedia-file-visual-content-snapshot-187369540.jpg"
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [stuff, setStuff] = useState([]);

    const items = ([
      {label: 'Pick-up', value: 'Pick-up'},
      {label: 'Chinese', value: 'Chinese'},
      {label: 'Indian', value: 'Indian'},
      {label: 'Mexican', value: 'Mexican'},
      {label: 'Fast Food', value: 'Fast Food'},
      {label: 'Desserts', value: 'Desserts'},
      {label: 'Pizza', value: 'Pizza'},
      {label: 'Drinks', value: 'Drinks'},
      {label: 'Pasta', value: 'Pasta'},
      {label: 'Snacks', value: 'Deals'},
    ]);

    const changeState = () => {
        setLogin(!login)
    }
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        }).catch((error) => (
            Alert.alert(error.message.slice(10,-22))
        ))

        if (toggleCheckBox){
             setDoc(doc(db, "companies", email), {
                name: name,
                email: email,
                address: address,
                image: businessImg,
                stars:0
              });
        }else{
             setDoc(doc(db, "users", email), {
                name: name,
                email: email,
              });
        }
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((cred) => {
        }).catch((error) => (
            Alert.alert(error.message.slice(10,-22))
        ))
    }

  return (
    <KeyboardAvoidingView  style={styles.container} behavior="padding">
           <ImageBackground source={{uri: '/Users/vinayasharma/Desktop/krish/screens/assets/foodImg.jpg'}} resizeMode="cover" style={[{ width: '100%',
        height: '100%',
        flex: 1 }, styles.container]}>
                <Image source={logo} style={{zIndex:999,width:165,height:130, position:'absolute', top:20,right:10}}></Image>
        <View style={styles.topCont}> 
           <TouchableOpacity
            onPress = {changeState}
            style = {login? styles.button1:styles.button2}>
                <Text style = {login? styles.buttonText2 : styles.buttonText1 }>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {changeState}
            style ={login? styles.button2:styles.button1}>
                <Text style = {login? styles.buttonText1 : styles.buttonText2 }>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
      <View style={styles.inputContainer}>
        {!login && <TextInput
          placeholder = "Name"
          value = {name}
          onChangeText = {name => setName(name)}
          style = {styles.input}
          />}
          <TextInput
          placeholder = "Email"
          value = {email}
          onChangeText = {text => setEmail(text)}
          style = {styles.input}
          />
          <TextInput
          placeholder = "Password"
          value = {password}
          onChangeText = {text => setPassword(text)}
          style = {styles.input}
          secureTextEntry
          />
         {/*!login && <View style={styles.checkboxContainer}>
            {!login && <Checkbox
                style = {{marginTop:20, marginRight: 10}}
                disabled={false}
                value={toggleCheckBox}
                dropDown
                onValueChange={(newValue) => setToggleCheckBox(newValue)}/>}
            {!login &&<Text style={{marginTop:20}}>Applying As A Company?</Text>}
      </View>*/}
      {!login && toggleCheckBox && <TextInput
      placeholder='Address'
      style = {[styles.input, {marginTop:20}]}
      value={address}
      onChangeText={text => setAddress(text)}
      />}

    {!login && toggleCheckBox && 
    <View style={{flexDirection:'row'}} ><Image style={{width:100, height:100, marginTop:20}} source={{uri: businessImg? businessImg:PLACEHOLDER}}/>
    <TextInput placeholder='Business Image URL' style = {[styles.input, {marginTop:20, height:40,width:'60%' , marginLeft:20}]}
      value={businessImg}
      onChangeText={businessImg => setBusinessImg(businessImg)}/>

    </View>
    }

        </View>
      <View style={styles.buttonContainer}>
         { login && <TouchableOpacity
          onPress = {handleLogin}
          style = {styles.button3} >
              <Text style = {styles.buttonText1}>
                  Login
              </Text>
          </TouchableOpacity>}
          { !login && <TouchableOpacity
          onPress = {handleSignUp}
          style ={styles.button3}>
              <Text style = {[styles.buttonText1, {zIndex:-5}]}>
                  Register
              </Text>
          </TouchableOpacity>}
      </View>

      <View style={{zIndex:999,width:210,height:130, position:'absolute', bottom:5,right:5}}>
            <Text style={[styles.buttonText2, {marginTop:10}]}>Helping Small Businesses.</Text>
            <Text style={[styles.buttonText2, {marginTop:10}]}>Saving The Environment.</Text>
            <Text style={[styles.buttonText2, {marginTop:10}]}>Making Food Accessible.</Text>
      </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
    }
    ,topCont:{ marginBottom:40, justifyContent:"center", flexDirection:"row", alignSelf:"center", width:"60%", backgroundColor:"white", borderRadius:20}
    ,checkboxContainer:{ marginTop:10,alignItems:'center',paddingBottom:15,paddingLeft:20,paddingRight:20 , borderRadius:20,justifyContent:"center", flexDirection:"row", alignSelf:"center", width:"80%", backgroundColor:'white'}
    ,inputContainer: {width: "80%"}
    ,buttonContainer: {width: "60%", justifyContent:"center", alignItems: "center", marginTop:40}
    ,button2: {backgroundColor:"white", width:"60%", padding:15, borderRadius:20, alignItems:"center"}
    ,button1: {backgroundColor:"green", width:"60%", padding:15, borderRadius:20, alignItems:"center"}
    ,button3: {backgroundColor:"white",borderColor:"green", borderWidth:2, width:"60%", padding:15, borderRadius:20, alignItems:"center"}
    ,input: {backgroundColor:"white", paddingHorizontal:15, paddingVertical:15, borderRadius:10, marginTop:5}
    ,buttonText1: {color:"green", fontWeight:"700", fontSize:16}
    ,buttonText2: {color:"white", fontWeight:"700", fontSize:16}
});

