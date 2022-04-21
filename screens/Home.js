import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {auth, db} from './Firebase'
import {onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { SignedInStack, SignedOutStack, CompanyStack } from './Navigation';

const Home = ({navigation}) => {
  const [isCompany, setIsCompany] = useState(false)
  let user;
  const [currrentUser, setCurrentUser] = useState(null)
  const userHandle = user => user? setCurrentUser(user): setCurrentUser(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => userHandle(user))}, [])


  const check = async() =>{
    const dbRef = collection(db, "users")
    let theUser = currrentUser? auth.currentUser.email[0].toUpperCase() + auth.currentUser.email.substring(1): null
    const docRef =  currrentUser? doc(dbRef, theUser): null
    const docSnap =  await getDoc(docRef)
    
  if (docSnap.exists()) {
  setIsCompany(false)
  } else {
  setIsCompany(true)
  }
  return () => {check, dbRef, docRef, docSnap}
  }

  check()

  if (!isCompany && currrentUser ){
    return <SignedInStack/>
  } else if(currrentUser)  {
    return <CompanyStack/>
  } else{
    return  <SignedOutStack/>
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems:"center"
  }, 
  buttom:{
    marginTop:40,
    backgroundColor:"green", 
    width:"60%", 
    padding:15, 
    borderRadius:10, 
    alignItems: "center"
  },
  buttonText:{
    color:"white", 
    fontWeight:"700",
    fontSize:16
  }
});

