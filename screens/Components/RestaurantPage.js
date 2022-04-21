import { View, Text, Image, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Divider from 'react-native-elements/dist/divider/Divider'
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import {auth, db} from '../Firebase'

const RestaurantPage = ({navigation, route}) => {
  const [items, setItems] = useState([])

useEffect(() => {
  let isMounted = true;
  let thecompany = route.params.email.toLowerCase()
  const theItems = query(collection(db, "items"), where("company", "==", thecompany));
  let stuff = onSnapshot(theItems, (snapshot => {
    if (isMounted){
      setItems(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
    } 
  }))
  return () => {theItems, stuff({}), thecompany, isMounted=false}
}, []
)

const handleAddItem = async (item) => {
  {/*var dt = new Date();
  dt.setMinutes( dt.getMinutes() + item.itemPrep );*/}
  let isMounted = true;
  if (isMounted){
    const docRef = await addDoc(collection(db, "orders"), {
      itemName:  item.itemName,
      itemCost: item.itemCost,
      orderFrom: auth.currentUser.email,
      orderTo: item.company, 
      address: item.address, 
      orderPlaced: false,
      orderComplete:false,
      itemId: item.id,
      prepTime: item.itemPrep
    });
  }
  return () => {item, docRef(), handleAddItem(), isMounted=false}
}

  return (
    <View style={{position:'relative', backgroundColor:"#faf5e8", height:"100%"}}>
      <Image style={{width:"100%", height:"40%"}}  source={{uri: route.params.image}} />
 
    <View style={{position:'absolute', width:"100%", height:"100%",top:"28%",backgroundColor:"#faf5e8", borderRadius:50}}>
    <View style={{marginHorizontal:20,flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:40, marginBottom:10}}>
    <TouchableOpacity onPress={() => navigation.goBack()}  >
         <Icon name='ios-arrow-back' size={30} />
       </TouchableOpacity>
    <Text style ={{fontSize:25, fontWeight:'bold', width:"93%",textAlign:'center'}}>{route.params.name}</Text>
    </View>
    <View style={{flexDirection:'row', width:"100%", justifyContent:'center'}}>
      <View style={{backgroundColor:'#e7eddf', paddingHorizontal:10, paddingVertical:10, borderRadius:5, marginHorizontal:10}}>
      <Text style ={{fontSize:13, color: "#103d05"}}>{route.params.address}</Text>
      </View>
                <View style = {{marginHorizontal:20, justifyContent:'center', alignItems:'center',borderRadius:15, backgroundColor: "green", height: 30, width: 30}}>
                       <Text style={{color:'white'}} >{route.params.stars}</Text>
               </View>

    </View>

<View style={{marginVertical:30, marginHorizontal:20, alignItems:'center'}}>
  <ScrollView style={{marginBottom:'100%'}} >
{items.length > 0 ?
items.map((item, index) =>
<View style={{padding:15}} key={index} >
  <Divider/>
  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <Text style ={{marginTop:27, fontSize: 15, fontWeight:'bold'}} >{item.itemName}</Text>
  <View style={{flexDirection:'row', marginTop:20}} >
   <Text style ={{marginTop:6, alignItems:'center', fontSize: 17, fontWeight:'bold'}} >${item.itemCost}</Text>
   <TouchableOpacity onPress={() => handleAddItem(item)} >
   <Icon color={'green'} size={30} name='ios-cart'/>
   </TouchableOpacity>
   </View>
  </View>
  <Text style ={{fontSize: 15, minWidth:280, marginTop:15}} >{item.itemDescription}</Text>

</View>
): <Text style = {{marginLeft: 10, fontSize:15}} >nothing on sale...check back later!</Text>}
</ScrollView>
</View>
    </View>
   </View>

    
  );
};

export default RestaurantPage;

