import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput } from 'react-native';


import axios from 'axios';

import DATA from '../../data.json';
import { URL } from '../utils/constant/urls';
import { TouchableOpacity } from 'react-native';
import { ArticlesContext } from '../../App';



export default function Articles({ navigation }) {
  // const [articles, setArticles] = useState([]);

  const [articles, setArticles] = useContext(ArticlesContext);
  const [filtreArticles, setFiltreArticles] = useState([]);

  console.log(articles);
  useEffect(() => {
    setFiltreArticles([...articles]);
  },[articles]);

  console.log(filtreArticles);

  const Item = ({ article }) => (
    <TouchableOpacity
      onPress={()=>handleClick({article})}
    >
      <View style={styles.item}>
        <Image source={{ uri: article.picture }}
          style={{ width: 150, height: 150  }} />
        <View style={styles.text}>
          <Text style={styles.title} >{article.name}</Text>
          <Text >${article.price}</Text>
          <Text >{article.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const handleClick = ({ article }) => {
    console.log(article);
    navigation.navigate('Article',{article});
  }

  const handleCherche = (value) => {
    const newTab = articles.filter(article => article.name.toLowerCase().includes(value.toLowerCase()));
    console.log(newTab);
    setFiltreArticles(newTab);
  }

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try{
  //       const { data } = await axios.get(URL.fetchAllArticles);
  //       setArticles(data["hydra:member"]);
  //       setFiltreArticles(data["hydra:member"]);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   fetchArticles();
  // }, []);


  return (
    <>
    <View style={styles.recherche}>
      <TextInput
        style={styles.input}
        placeholder='Rechercher des articles'
        onChangeText={(value)=> handleCherche(value)}
      />
    </View>
    <FlatList data={filtreArticles} renderItem={({ item }) => <Item article={item} />} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  item: {
    border : '7px solid white',
    borderRadius: 15,
    backgroundColor: '#EFEDFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  text:{
    display: 'flex', 
    justifyContent: 'center',
    width: 150,
    padding: 10,
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  recherche:{
    alignSelf: 'center',
  }
}) 