import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { postData } from './postData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {auth} from '../Firebase'
import { collection, query, where, getDocs, collectionGroup, onSnapshot } from "firebase/firestore";
import {db} from '../Firebase'

const HomePosts = ({navigation, search}) => {

  let theChosenFact;
  const [theFacts, settheFacts] = useState(null)

  const randomNum = () => {
    let num = Math.floor(Math.random() *3)
    return(num);
  }

  useEffect(() => {
    let isMounted = true;
    let factsRef = collectionGroup(db, "facts")
    let facts = onSnapshot(factsRef, (snapshot => {
      if (isMounted){
        settheFacts(snapshot.docs.map(fact => ({id:fact.id, ...fact.data()})))
      }
    }))
    return () => {factsRef, facts({}), isMounted=false}
}, []
)

  const randomFact = () => {
    let randomFactNum = Math.floor(Math.random()* theFacts.length)
    theChosenFact = theFacts[randomFactNum];
    return theChosenFact.fact;
  }

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    let isMounted = true;
        let theCompanies = collectionGroup(db, 'companies')
        let stuff = onSnapshot(theCompanies, (snapshot => {
          if (isMounted){
            setCompanies(snapshot.docs.map(posts => ({id:posts.id, ...posts.data()})))
          }
        }))
        return () => {theCompanies, stuff({}), isMounted=false}
    }, []
)

  return (
    <ScrollView style={{marginTop:15}} >
      {companies.filter(val => {
        if (search == ""){
          return val
        } else if (val.name.toLowerCase().includes(search.toLowerCase())){
          return val
        }
      }).map(
          (post, index) =>
          <View key ={index}>
             <TouchableOpacity onPress={() => navigation.push('RestaurantPage', post)}>
                  <View 
                  style={{marginBottom:20, justifyContent:'space-around', backgroundColor:"#e7eddf", marginHorizontal:10, borderRadius:20, shadowColor: '#171717',
                  shadowOffset: {width: 2, height: 4},
                  shadowOpacity: 0.3,
                  shadowRadius: 3,}} >
                    <Image style={{width:"100%", height:220, borderRadius:20}}  source={{uri: post.image}} />
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingHorizontal:20, paddingTop:10, paddingBottom:20}} >
                     
                      <View>
                       <Text style ={{fontSize: 15,fontWeight:'bold'}}>{post.name}</Text>
                       <Text style ={{marginTop:5,fontSize:13, color: "grey"}}>{post.address}</Text>
                       </View>
                    {
                      post.stars && 
                      <View style = {{justifyContent:'center', alignItems:'center',borderRadius:15, backgroundColor: "green", height: 30, width: 30}}>
                      <Text style={{color:'white'}} >{post.stars}</Text>
              </View>
                    }
                  
                    
                        </View>   
            </View>
            </TouchableOpacity> 

            {randomNum() == 1 && theFacts && (
                 <View style={{padding:15,marginTop:5, marginBottom:25, justifyContent:'space-around', backgroundColor:"#e7eddf", marginHorizontal:10, borderRadius:20, shadowColor: '#171717', shadowOffset: {width: 2, height: 4},shadowOpacity: 0.3,shadowRadius: 3,}}>
                 <Text style={{fontSize: 15,fontWeight:'bold'}}>Did You Know?</Text>
                 <Text style={{marginTop:10}}>{randomFact()}</Text>
                 </View>
            ) }
                        
          </View>)}
    </ScrollView>
  )
  }


export default HomePosts;
