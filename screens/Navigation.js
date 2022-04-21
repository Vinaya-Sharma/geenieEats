import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./Login"
import React, {useState, useEffect }  from 'react';
import RestaurantPage from './Components/RestaurantPage'
import HomePosts from './Components/HomePosts';
import UsersHome from './UsersHome';
import BottomTabs from './Components/BottomTabs';
import EditProfile from './Components/EditProfile'
import Cart from './Components/Cart';

const Stack = createStackNavigator()
const ScreenOptions = {
    headerShown: false 
}

const SignedOutStack = () => { return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={ScreenOptions} > 
            <Stack.Screen name = 'Login' component={Login}/>
        </Stack.Navigator>
    </NavigationContainer>
)}

const SignedInStack = () => { return(
  <NavigationContainer>
      <Stack.Navigator initialRouteName='UserHome' screenOptions={ScreenOptions} > 
          <Stack.Screen name = 'UserHome' component={UsersHome}/>
          <Stack.Screen name = 'HomePosts' component={HomePosts}/>
          <Stack.Screen name = 'RestaurantPage' component={RestaurantPage}/>
          <Stack.Screen name = 'Cart' component={Cart}/>
      </Stack.Navigator>
  </NavigationContainer>
)}


const CompanyStack = () => { return(
  <NavigationContainer>
     <BottomTabs />
  </NavigationContainer>
)}

const EditStack =() => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = 'EditProfile' component={EditProfile}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
    }


export  {SignedInStack, SignedOutStack, CompanyStack, EditStack};
