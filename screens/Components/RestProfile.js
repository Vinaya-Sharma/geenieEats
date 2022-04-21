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
const RestProfile = () => {
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
  
  useEffect(() => {
    let isMounted = true;
    let  theItems = query(collection(db, "items"), where("company", "==", company.email))
    onSnapshot(theItems, (snapshot => {
      if (isMounted){
        setItems(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
      }
    }))
    return () => {theItems, isMounted=false}
  }, []
  )

  const handleEdit = () => {
    setEdit(!edit)
  }

  const [orders, setOrders] = useState([])
  const [checking, setChecking] = useState(false)

  const handleDeleteItem = async(item) => {
        let isMounted = true;
      let  Items = query(collection(db, "orders"), where("itemId", "==", item.id))
      let theItems = query(Items, where("orderPlaced", "==", false)) 
      onSnapshot(theItems, (snapshot => {
        if (isMounted){
          setOrders(snapshot.docs.map(posts => ({id:posts.id})))
        }
      }))

      if (isMounted){
        for (let i = 0; i < orders.length; i++){
          await deleteDoc(doc(db, "orders", orders[i].id))
        }
  
        if (checking){
          deleteDoc(doc(db, "items", item.id))
          console.log('should deleye')
          setChecking(!checking)
        } else {
          setChecking(!checking)
          alert("Are you sure you want to delete this item? Click the trash icon again to confrim.")
        }
      }

      return (isMounted = false)
  }

  return (
    <View style={{position:'relative', backgroundColor:"#faf5e8", height:"100%"}}>
      {myCompany.map((company, index) => 
          <Image key={index} style={{width:"100%", height:"40%"}}  source={{uri:company.image}} />
        )}
   
     
    <View style={{position:'absolute', width:"100%", height:"100%",top:"28%",backgroundColor:"#faf5e8", borderRadius:50}}>
    
    {myCompany.map((company, index) => 
    <View key={index}>
    <View style={{marginHorizontal:20,flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:40, marginBottom:10}}>
    <Text style ={{fontSize:25, fontWeight:'bold', width:"100%",textAlign:'center'}}>{company.name}</Text>
    </View>
    <View style={{flexDirection:'row', width:"100%", justifyContent:'center'}}>
      <View style={{backgroundColor:'#e7eddf', paddingHorizontal:10, paddingVertical:10, borderRadius:5, marginHorizontal:10}}>
      <Text style ={{fontSize:13, color: "#103d05"}}>{company.address}</Text>
      </View>
                <View style = {{marginHorizontal:20, justifyContent:'center', alignItems:'center',borderRadius:15, backgroundColor: "green", height: 30, width: 30}}>
                 {company.stars==0? 
                 <Icons name='utensils' color={"white"} />: <Text style={{color:"white"}}>{company.stars}</Text>
                       }
               </View>
    </View>
    </View>
    )}


<View style={{marginVertical:30, marginHorizontal:20, alignItems:'center', flex:1, paddingBottom:200}}>
  <ScrollView >
{items.length > 0 ?
items.map((item, index) =>
<View style={{padding:15}} key={index} >
  <Divider/>
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <Text style ={{marginTop:27, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
  <View style={{flexDirection:'row', marginTop:40, justifyContent:'center', alignItems:"center"}} >
   <Text style ={{ alignItems:'center', fontSize: 17, fontWeight:'bold', marginHorizontal:5}} >${item.itemCost}</Text>
   <TouchableOpacity onPress={() => handleDeleteItem(item)}>
     <Iconss color={'green'} name='delete' size={20}/>
   </TouchableOpacity>
   </View>
  </View>
  <Text style ={{fontSize: 15, minWidth:280}} >{item.itemDescription}</Text>
</View>
): <Text style = {{marginLeft: 10, fontSize:15}} >no items on sale yet... add dishes to your profile!</Text>}
</ScrollView>
</View>
    </View>
   </View>

  )
}

export default RestProfile

{/*    <SafeAreaView>
      {myCompany.map((myCompany, index) => 
      <View key= {index} style={{marginBottom:20,padding:10}} >
      <Image style={{width:370, height:220}}  source={{uri: myCompany.image}}/>
      <View style = {{flexDirection:'row', alignItems:'center', marginTop:10}} >
      <View>
      <Text style ={{fontSize: 15, fontWeight:'bold'}}>{myCompany.name}</Text>
      <Text style ={{fontSize:13, color: "grey"}}>{myCompany.address}</Text>
      </View>
      <TouchableOpacity onPress={handleEdit} >
      <View  style={{ marginLeft:170, alignItems:'center', paddingTop:17}} >
      <Icons name='user-edit' size={30} />
      <Text style ={{fontSize:13, color: "grey"}}>Edit Profile</Text>
      </View>
      </TouchableOpacity>
    <View style = {{justifyContent:'center', marginLeft:"auto",alignItems:'center',borderRadius:15, backgroundColor: "green", height: 30, width: 30}}>
        <Text style={{color:'white'}} >{myCompany.ratings}</Text>
    </View>
    </View>
    </View>
      )}

<View>
{items.length > 0 ?
items.map((item, index) =>
<View style={{padding:10}} key={index} >
  <Divider/>
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <Text style ={{marginTop:20, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
  <View style={{flexDirection:'row', marginTop:30}}>
   <Text style ={{marginTop:6, alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}   </Text>
   <TouchableOpacity onPress={() => handleDeleteItem(item)}>
     <Iconss color={'green'} name='delete' size={30}/>
   </TouchableOpacity>
   </View>
  </View>
  <Text style ={{fontSize: 15}} >{item.itemDescription}</Text>
</View>
): <Text style = {{marginLeft: 10, fontSize:15}} >Nothing on sale...Add more to your profile!</Text>}
</View>
    </SafeAreaView>*/}