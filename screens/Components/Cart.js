import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import {auth, db} from '../Firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from 'react-native-elements/dist/divider/Divider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { addDoc, writeBatch,collection, collectionGroup, doc, deleteDoc,getDoc, setDoc,onSnapshot, query, where, updateDoc, orderBy } from "firebase/firestore"; 
import Iconss from 'react-native-vector-icons/AntDesign';

const Cart = ({navigation}) => {

  const sayings = [
    "Thanks for ordering with GeenieEats. You saved meals from going to waste!",
"Thanks for ordering with GeenieEats. Your saving our environment one meal at a time!",
"Thanks for ordering with GeenieEats. Your purchase is making a positive impact on the environment!",
"Thanks, you just saved your meal from joining the 3.3 million tonnes of food waste that go into landfills each year!",
"Thank you for your order. Your purchase is helping your community and the environment!"
  ]


  const [myOrders, setMyOrders] = useState([])
  const [orderStuff, setOrderedStuff] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [stuff, setStuff] = useState(true)
  let user = auth.currentUser.email

  const handleDeleteItem = async(item) => {
    const stuff = await deleteDoc(doc(db, "orders", item.id));
    return () => {stuff}
  }

  useEffect(() => {
    let isMounted = true;
    let ordersbaby = query(collection(db, "orders"), where("orderFrom", "==", user))
    let theorders = query(ordersbaby, where("orderPlaced", "==", false))
    let findingStuff = onSnapshot(theorders, (snapshot => {
      if (isMounted){
        setMyOrders(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
      }
    }))
    return () => {findingStuff(), isMounted = false}
  }, []
  )

  useEffect(() => {
    let isMounted = true;
    let ordersbaby = query(collection(db, "orders"), where("orderFrom", "==", user))
    let theorders = query(ordersbaby, where("orderPlaced", "==", true), orderBy("timestamp", "desc"))
    let findingStuff = onSnapshot(theorders, (snapshot => {
      if (isMounted){
        setPastOrders(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
      }
    }))
    return () => {findingStuff(), isMounted = false}
  }, []
  )

  const [first, setfirst] = useState(true)
  const placeOrder = () =>{
    let stuff = []
    let isMounted = true;
    const thenum = Math.floor(Math.random()*sayings.length)
    const theSaying = sayings[thenum]
   
    myOrders.map((order) => stuff.push(order.id))
    setOrderedStuff(stuff)

      first? Alert.alert('Click the "place all orders" button to confirm your order.'):  Alert.alert(theSaying)
      setfirst(!first)
      setStuff(!stuff)

      if (isMounted){
        orderStuff.map( async(id) => {
          const washingtonRef = doc(db, "orders", id);
          let mama =  await updateDoc(washingtonRef, {
            orderPlaced: true,
            timestamp: new Date()
          }); return () =>  {mama, washingtonRef}
          })
      }
      return () => {theOrder, setOrderedStuff, setStuff,theOrder, ordersbaby, isMounted = false} 
      }
  return (
    <View style={{backgroundColor:"#faf5e8", height:"100%"}}>
       <SafeAreaView >
      <View style={{ flexDirection:'row',marginTop:50, marginBottom:30}}>
       <TouchableOpacity onPress={() => navigation.goBack()}  >
         <Icon name='ios-arrow-back' size={30} />
       </TouchableOpacity>
       <Text style = {{width:"92%", textAlign:'center',color:"green", fontWeight:"700", fontSize:20}} >Your Cart</Text>
             </View>

    <View style = {{alignItems:'center'}}>

      <ScrollView showsVerticalScrollIndicator={false} style={{width:'84%'}} >
        <View style={{backgroundColor:'#eff5e6', borderColor:"#c7d4b6", borderWidth:1 , borderRadius:10, padding:20}} >
        {myOrders.length > 0 ?
      myOrders.map((item, index) =>
  <View style={{padding:10}} key={index} >
    <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:10}}>
    <Text style ={{fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
     <Text style ={{ alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}   </Text>
     <TouchableOpacity onPress={() => handleDeleteItem(item)}>
    <Text style={{fontSize:10}} >❌</Text>
   </TouchableOpacity>
     </View>
    </View>
    <Text style ={{fontSize: 15, marginBottom:15}} >{item.address}</Text>
    <Divider/>
  </View>
  ): <Text style = {{marginLeft: 10, fontSize:15, marginTop:20, alignItems:'center'}} >{`Nothing in your cart yet... \nTreat yourself with a meal with the magic of GeenieEats`}</Text>}

     {myOrders.length>0 && <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress = {placeOrder}
          style ={[styles.button3, {backgroundColor:"#fdfffa"}]}>
              <Text style = {styles.buttonText1}>
                  Place All Orders
              </Text>
          </TouchableOpacity>
       </View>}
       </View>

       <View>
          <View style={{alignItems:'center', marginTop:70}} >
          {pastOrders.length>0 && <Text style = {{color:"green", fontWeight:"700", fontSize:20}}>Past Orders</Text>}
          </View>

          {pastOrders.length > 0 && 
          <View style={{backgroundColor:'#eff5e6', borderColor:"#c7d4b6", borderWidth:1 , borderRadius:10, padding:20, marginVertical:30}} >
          {pastOrders.length>0 &&
      pastOrders.map((item, index) =>
  <View style={{padding:10}} key={index} >
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    <Text style ={{marginTop:20, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
    <View style={{flexDirection:'row', marginTop:30}} >
     <Text style ={{marginTop:6, alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}   </Text>
     </View>
    </View>
    <Text style ={{fontSize: 15}} >{item.address}</Text>
    {/*<Text>{new Date((item.timestamp.seconds+ (item.prepTime*60))* 1000).toLocaleString()}</Text>*/}
   {new Date((item.timestamp.seconds+ (item.prepTime*60))* 1000) > new Date()?  <Text style={{marginBottom:15, fontSize:14, fontWeight:'bold', color:"green"}} >{"Approximatley ready by: " +new Date((item.timestamp.seconds+ (item.prepTime*60))* 1000).toLocaleString().slice(11)}</Text>:  <Text style={{marginBottom:15, fontSize:15, fontWeight:'bold'}}>Order Is Complete</Text>}
    {/* new Date().getTime() < new Date(item.orderCompleteAt).getTime()? <Text>the food is ready</Text> : <Text>the food is not ready</Text>*/}
    {/*<Text style={{marginBottom:15}} >{(new Date(item.timestamp.seconds*1000).toLocaleString())} </Text>*/}
    <Divider/>
  </View>
  )}
    </View>
          }
          
          </View>

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