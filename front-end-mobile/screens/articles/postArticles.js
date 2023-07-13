import React , { useState, useEffect, useContext } from 'react'
import { TextInput, StyleSheet, Button, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {URL} from '../utils/constant/urls';
import axios from 'axios';
import { ArticlesContext } from '../../App';



function PostArticles({navigation}) {
const [article, setArticle] = useState({
  name: '',
  description: '',
  price: '',
  picture: ''
});

const [articles, setArticles] = useContext(ArticlesContext);

const handleChange = (propriete, value) => {
  setArticle({ ...article, [propriete]: value });
}

const handleSubmit = async () => {
  if(article.name && article.description && article.price && article.picture){
      const prix = parseFloat(article.price);
      if(prix){
          try{
            await axios.post(URL.postArticles,{
              name: article.name,
              description: article.description,
              price: prix,
              picture: article.picture
            });
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
            navigation.navigate('Articles');
          }catch(error){
            console.log(error);
          }       
      }else{
        alert('Veuillez saisir un prix valide');
      }    
  }else{
    alert('Veuillez remplir tous les champs');
  }
}


  return (
    <>
    <View>
    <TextInput
        style={styles.input}
        onChangeText={(value)=> handleChange('name', value)}
        placeholder='Article name'
      />
      <TextInput
      style={styles.input}
      onChangeText={(value)=> handleChange('description', value)}
      placeholder='Article description'
    />
    
    <TextInput
      style={styles.input}
      //keyboardType="numeric"
      onChangeText={(value)=> handleChange('price', value)}
      placeholder='Article price'
    />
      <TextInput
      style={styles.input}
      onChangeText={(value)=> handleChange('picture', value)}
      placeholder='picture'
    />
    <Button title='Submit' onPress={() => {
      console.log(article)
      handleSubmit()
    }}
    />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})

export default PostArticles