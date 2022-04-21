import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {auth, db} from '../Firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from 'react-native-elements/dist/divider/Divider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { orderBy,addDoc, writeBatch,collection, collectionGroup, doc, deleteDoc,getDoc, setDoc,onSnapshot, query, where, updateDoc } from "firebase/firestore"; 
import Iconss from 'react-native-vector-icons/AntDesign';
import Nav from './Nav'

const Cart = ({navigation}) => {
  const [myOrders, setMyOrders] = useState([])
  const [orderStuff, setOrderedStuff] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  let user = auth.currentUser.email

  const handleDeleteItem = async(item) => {
   const washingtonRef = doc(db, "orders", item.id);
   let mama =  await updateDoc(washingtonRef, {
     orderComplete: true
   }); return () =>  {washingtonRef, mama}
  }

  useEffect(() => {
    let isMounted = true;
    let ordersbaby = query(collection(db, "orders"), where("orderTo", "==", user))
    let theorders = query(ordersbaby, where("orderPlaced", "==", true), where("orderComplete", "==", false))
    let findingStuff = onSnapshot(theorders, (snapshot => {
      if (isMounted){
        setMyOrders(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))}
    }))
    return () => {findingStuff(), isMounted=false}
  }, [orderStuff]
  )

  useEffect(() => {
    let isMounted = true;
    let ordersbaby = query(collection(db, "orders"), where("orderTo", "==", user))
    let theorders = query(ordersbaby, where("orderPlaced", "==", true), where("orderComplete", "==", true))
    let findingStuff = onSnapshot(theorders, (snapshot => {
      if(isMounted){
        setPastOrders(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))}
    }))
    return () => {findingStuff(), isMounted=false}
  }, [orderStuff]
  )


  return (
    <View style={{backgroundColor:"#faf5e8", height:"100%"}}>

    <SafeAreaView>
       <Nav isCompany={false} />
       <View style={{ marginTop:30}}>
      <Text style = {{color:"green", fontWeight:"700", fontSize:20, width:"100%", textAlign:"center"}} >Orders</Text>
      </View > 
    <View style={{backgroundColor:'#eff5e6', borderColor:"#c7d4b6", borderWidth:1 , borderRadius:10, padding:20, margin:20}}>

      <ScrollView style={{width:'100%'}} >
        {myOrders.length > 0 ?
      myOrders.map((item, index) =>
  <View style={{padding:10}} key={index} >
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    <Text style ={{marginTop:10, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
    <View style={{flexDirection:'row', marginTop:30}} >
     <Text style ={{marginTop:6, alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}   </Text>
     <TouchableOpacity onPress={() => handleDeleteItem(item)}>
     <Iconss color={'red'} name='check' size={30}/>
   </TouchableOpacity>
     </View>
    </View>
    <Text style ={{fontSize: 15}} >{item.orderFrom}</Text>
    <Text style={{marginBottom:15}} >{(new Date(item.timestamp.seconds*1000).toLocaleString())} </Text>
    <Divider/>
  </View>
  ): <Text style = {{marginLeft: 10, fontSize:15, marginTop:20, alignItems:'center'}} >{`No Orders Yet`}</Text>}
      </ScrollView>
      </View>

      <Text style = {{color:"green", fontWeight:"700", fontSize:20, width:"100%", textAlign:"center", marginTop:30}} >Completed Orders</Text>
      <View style={{backgroundColor:'#eff5e6', borderColor:"#c7d4b6", borderWidth:1 , borderRadius:10, padding:20, margin:20}}>

      <View style={{ marginTop:30}}>

      </View > 
<ScrollView style={{width:'100%'}} >
  {pastOrders.length > 0 ?
pastOrders.map((item, index) =>
<View style={{padding:10}} key={index} >
<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style ={{marginTop:10, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
<View style={{flexDirection:'row', marginTop:30}} >
<Text style ={{marginTop:6, alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}   </Text>
</View>
</View>
<Text style ={{fontSize: 15}} >{item.orderFrom}</Text>
<Text style={{marginBottom:15}} >{(new Date(item.timestamp.seconds*1000).toLocaleString())} </Text>
<Divider/>
</View>
): <Text style = {{marginLeft: 10, fontSize:15, marginTop:20, alignItems:'center'}} >{`No Completed Orders`}</Text>}
</ScrollView>
</View>


    </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
button3: {marginTop:20, backgroundColor:"white",borderColor:"green", borderWidth:2, width:"60%", padding:15, borderRadius:20, alignItems:"center"}
,input: {backgroundColor:"white", paddingHorizontal:15, paddingVertical:10, borderRadius:10, marginTop:5}
    ,buttonText1: {color:"green", fontWeight:"700", fontSize:16}
    
})