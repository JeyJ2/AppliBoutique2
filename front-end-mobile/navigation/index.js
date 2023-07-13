import React, { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Articles from '../screens/articles/getArticles';
import PostArticles from '../screens/articles/postArticles';
import SinglePage from '../screens/articles/SinglePage';
import StackNavigator from './router';

const Tabs = createBottomTabNavigator();



export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={Articles} />
          <Tabs.Screen name="Add" component={PostArticles} />
        <Tabs.Screen name="Article" component={StackNavigator} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
}
