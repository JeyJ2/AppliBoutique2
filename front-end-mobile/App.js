import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

//composnats
//import Articles from './screens/articles/getArticles';
//import PostArticles from './screens/articles/postArticles';

import AppNavigation from './navigation';
import TabNavigator from './navigation/router';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from './screens/utils/constant/urls';



export const ArticlesContext = React.createContext()



export default function App() {

      const [articles, setArticles] = useState([])

      useEffect(() => {
            const fetchAllArticles = async () => {
              try{
                const { data } = await axios.get(URL.fetchAllArticles);
                setArticles(data["hydra:member"]);
                console.log(data["hydra:member"]);
            }catch(error){
                console.log(error);
            }
        }
        fetchAllArticles();
      },[]);
    

    console.log(articles);
    
  return (
    <>
      <ArticlesContext.Provider value={[articles, setArticles]}>
      <TabNavigator />
      </ArticlesContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
