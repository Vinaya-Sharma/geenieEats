import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text } from 'react-native';
import React from 'react';
import CompanyAddItemPage from './CompanyAddItemPage';
import CompanyPastOrders from './CompanyPastOrders';
import Icon from 'react-native-vector-icons/Ionicons';
import RestProfile from "./RestProfile"

const BottomTabs = () => {
    const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator 
    initialRouteName="RestProfile"
    activeColor="white"
    inactiveColor="#B4C8B2"
    barStyle={{ backgroundColor: 'green' }}
    >
      <Tab.Screen name='RestProfile' component={RestProfile} 
                 options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <View >
                       <Icon color={color} size={26} name='ios-person-circle-sharp' />
                    </View>
                  ),
                }}/>
                <Tab.Screen name='CompanyAdd' component={CompanyAddItemPage} 
                 options={{
                  tabBarLabel: 'Add',
                  tabBarIcon: ({ color }) => (
                    <View >
                       <Icon color={color} size={26} name='ios-add-circle' />
                    </View>
                  ),
                }}/>
                <Tab.Screen name='CompanyOrders' component={CompanyPastOrders} 
                 options={{
                  tabBarLabel: 'Orders',
                  tabBarIcon: ({ color }) => (
                    <View >
                       <Icon color={color} size={26} name='ios-folder-open'  />
                    </View>
                  ),
                }}/>
                
    </Tab.Navigator>
  );
};

export default BottomTabs;
