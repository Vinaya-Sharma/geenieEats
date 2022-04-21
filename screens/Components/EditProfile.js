import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, View , Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfile = ({edit, setEdit}) => {
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [name, setName] = useState("") 
    const [businessImg, setBusinessImg] = useState("")

    const PLACEHOLDER = "https://thumbs.dreamstime.com/b/placeholder-rgb-color-icon-image-gallery-photo-thumbnail-available-album-digital-media-multimedia-file-visual-content-snapshot-187369540.jpg"


  return (
    <View>
    <View>
      <TouchableOpacity onPress={() => setEdit(!edit)}  >
        <View style={{flexDirection:'row'}} >
        <Icon name='ios-arrow-back' size={30} />
        <Text style={{color:'green', marginTop:8}}  >   Edit Your Profile!</Text>
        </View>
      </TouchableOpacity>
    </View>

<KeyboardAvoidingView  style={styles.container} behavior="padding">
<View style={([styles.inputContainer], {alignItems:'center'})}>
<TextInput
  placeholder = "Name"
  value = {name}
  onChangeText = {name => setName(name)}
  style = {[styles.input, {marginTop:20, minWidth:300}]}
  />
  <TextInput
  placeholder = "Email"
  value = {email}
  onChangeText = {text => setEmail(text)}
  style ={[styles.input, {marginTop:20, minWidth:300}]}
  />
<TextInput
placeholder='Address'
style = {[styles.input, {marginTop:20, minWidth:300}]}
value={address}
onChangeText={text => setAddress(text)}
/>

<View style={{flexDirection:'row'}} >
  <Image style={{width:100, height:100, marginTop:20}} source={{uri: businessImg? businessImg:PLACEHOLDER}}/>
    <View style={{width:200}} >
    <TextInput placeholder='Business Image URL' style = {[styles.input, {marginTop:20, height:40,width:'90%' , marginLeft:20}]}
    value={businessImg}
    onChangeText={businessImg => setBusinessImg(businessImg)}/>
    </View>
</View>
</View>
</KeyboardAvoidingView>
<View style={{alignItems:"center"}}>
<TouchableOpacity
          style ={styles.button3}>
              <Text style = {styles.buttonText1}>
                  Submit Changes
              </Text>
  </TouchableOpacity>
</View>
</View>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center", 
      alignItems: "center",
  }
  ,inputContainer: {width: "80%"}
  ,button3: {marginTop:330, borderColor:"green", borderWidth:2, width:"60%", padding:15, borderRadius:20, alignItems:"center"}
  ,input:  {height:40, backgroundColor:"white", paddingHorizontal:15, paddingVertical:10, borderRadius:10, marginTop:5}
  ,buttonText1: {color:"green", fontWeight:"700", fontSize:16}
});