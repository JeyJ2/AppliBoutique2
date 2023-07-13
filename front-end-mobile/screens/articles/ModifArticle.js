import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { URL } from '../utils/constant/urls'
import { ArticlesContext } from '../../App'

const ModifArticle = ({route, navigation}) => {
    const [article, setArticle] = useState(route.params.article)
    const [articles, setArticles] = useContext(ArticlesContext);  //pour faire mise à jour
    const handleChange = (propriete, value) => {
        setArticle({ ...article, [propriete]: value });
    }

    const handleSubmit = async () => {
        if(article.name && article.description && article.price && article.picture){
            const prix = parseFloat(article.price);
            if(prix){
                try{
                    await axios.put(URL.updateArticle+`${article.id}`,{
                      name: article.name,
                      description: article.description,
                      price: prix,
                      picture: article.picture
                  })

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
                  navigation.navigate('Article',{article});
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
    <View>
    <Button title="Retour" onPress={()=>navigation.goBack()}/>
    <TextInput
        style={styles.input}
        value = {article.name}
        onChangeText={(value)=> handleChange('name', value)}
      />
      <TextInput
      style={styles.input}
      value= {article.description}
      onChangeText={(value)=> handleChange('description', value)}
    />
    
    <TextInput
      style={styles.input}
      value = {article.price}
      //keyboardType="numeric"
      onChangeText={(value)=> handleChange('price', value)}
      placeholder='Article price'
    />
      <TextInput
      style={styles.input}
      value = {article.picture}
      onChangeText={(value)=> handleChange('picture', value)}
      placeholder='picture'
    />
    <Button title='Modifier' onPress={() => {
      console.log(article.id)
      handleSubmit()
    }}
    />
    </View>
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


export default ModifArticle