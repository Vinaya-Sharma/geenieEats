import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import Nav from './Nav'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { addDoc, collection, collectionGroup, doc, deleteDoc,getDoc, setDoc,onSnapshot, query, where } from "firebase/firestore"; 
import {db, auth} from "../Firebase"
import Divider from 'react-native-elements/dist/divider/Divider'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconss from 'react-native-vector-icons/AntDesign';
import { EditStack } from '../Navigation';

const CompanyAddItemPage = ({edit,setEdit}) => {
  const [itemName, setItemName] = useState('')
  const [itemCost, setItemCost] = useState('')
  const [itemPrep, setItemPrep] = useState()
  const [itemDescription, setItemDescription] = useState('')
  const [myCompany, setMyCompany] = useState([])
  const [items, setItems] = useState([])
  let company = auth.currentUser

  let companyUpperEmail = company.email[0].toUpperCase() + company.email.substring(1)

  useEffect(() => {
    let isMounted = true;
    let theCompany = query(collection(db, "companies"), where("email", "==", companyUpperEmail))
    onSnapshot(theCompany, (snapshot => {
      if (isMounted){
        setMyCompany(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
      }
    }))
    return () => {theCompany, isMounted=false}
  }, []
  )
  
  useEffect( () => {
    let isMounted = true;
    let theItems =  query (collection(db, "items"), where("company", "==", company.email))
     onSnapshot(theItems, (snapshot => { 
       if (isMounted){
        setItems (snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
       }
    }))
    return () => {theItems, isMounted=false}
  }, []
  )

  const handleAdd = async () => {
    let isMounted = true;
      const letsAddDoc = await addDoc(collection(db, 'items'), {
        company: company.email,
        address: myCompany[0].address,
        itemName: itemName,
        itemDescription: itemDescription,
        itemCost: itemCost,
        itemPrep: itemPrep? parseInt(itemPrep): 0
    })
    if (isMounted){
    setItemCost('')
    setItemName('')
    setItemDescription('')
    setItemPrep('')}
    return () => {letsAddDoc(), isMounted=false}
  }

  return (
    <View >
      <Nav isCompany={false} />
      <KeyboardAvoidingView style={{marginHorizontal:20, marginTop:30}}>
        <View style={{alignItems:'center',backgroundColor:'#eff5e6', borderColor:"#c7d4b6", borderWidth:1 , borderRadius:10, padding:20}} >
        <Text style={{color:'green', fontSize:18, fontWeight:'700', marginVertical:20}} >Add More Items To Your Profile!</Text>
      <TextInput
          placeholder = "Item Name"
          value = {itemName}
          onChangeText = {name => setItemName(name)}
          style = {styles.input}
          />
          <TextInput
          placeholder = "Item Description"
          value = {itemDescription}
          onChangeText = {text => setItemDescription(text)}
          style = {styles.input}
          />
          <TextInput
          placeholder = "Item Cost"
          value = {itemCost}
          onChangeText = {text => setItemCost(text)}
          style = {styles.input}
          />
          <TextInput
          placeholder = "Estimated Preptime (minutes)"
          value = {itemPrep}
          onChangeText = {text => setItemPrep(text)}
          style = {styles.input}
          />
               <TouchableOpacity
               onPress={handleAdd}
          style = {styles.button3} >
              <Text style = {styles.buttonText1}>
                  Add Item
              </Text>
          </TouchableOpacity>
          <Divider/>
          </View>
      </KeyboardAvoidingView>

    </View>
  );}

export default CompanyAddItemPage;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center", 
      alignItems: "center",
  }
  ,button3: {backgroundColor:"white",borderColor:"green", borderWidth:2, width:200, padding:15, borderRadius:20, alignItems:"center", marginTop:20}
  ,buttonText1: {color:"green", fontWeight:"700", fontSize:16}
  ,input: {backgroundColor:"white", width:'80%',paddingHorizontal:15, paddingVertical:10, borderRadius:10, marginVertical:8}
});