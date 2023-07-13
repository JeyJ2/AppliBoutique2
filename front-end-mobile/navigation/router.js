import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Articles from '../screens/articles/getArticles';
import PostArticles from '../screens/articles/postArticles';
import SinglePage from '../screens/articles/SinglePage';
import ModifArticle from '../screens/articles/ModifArticle';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function TabNavigator(){
    return(
        <NavigationContainer>
        <Tab.Navigator /*pour éviter double header </NavigationContainer>screenOptions={ { headerShown: false }}*/> 
            <Tab.Screen name="Home" component={StackNavigator} />
            <Tab.Screen name="Add" component={PostArticles} />
        </Tab.Navigator>
        </NavigationContainer>
    )
}


export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Articles" component={Articles} />
            {/* <Stack.Screen name="Add" component={PostArticles} /> */}
            <Stack.Screen name="Article" component={SinglePage} />
            <Stack.Screen name="ModifArticle" component={ModifArticle} />
        </Stack.Navigator>
    )
}