import { View, Text, Image, Button , StyleSheet, Modal, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'

import { URL } from '../utils/constant/urls'
import axios from 'axios'

const handleDelete = async ({article}) => {
  try{
    await axios.delete(URL.deleteArticle+`${article.id}`);
    navigation.navigate('Articles');
  }catch(error){
    console.log(error);
  }
}

const SinglePage = ({route, navigation}) => {
    console.log(route)
    console.log(route.params);
    const {article} = route.params
    const [modalVisible, setModalVisible] = useState(false);  //modal
  return (
    <View>
    <Button title="Retour" onPress={()=>navigation.navigate('Articles')}/>
      <View style={{alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>{article.name}</Text>
      <Text>${article.price}</Text>
      <Text>{article.description}</Text>
      </View>
      
      <Image source={{ uri: article.picture }} style={{height: 300, width: 300, alignSelf: 'center'}}/>
     
    <Button title="modifier" onPress={()=>{navigation.navigate('ModifArticle',{article})}}/>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Voulez vous vraiment supprimer l'article : {article.name} ? </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Non</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {handleDelete({article})}}>
                <Text style={styles.textStyle}>Oui Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Supprimer</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  delete: {
    backgroundColor: '#FF0000'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default SinglePage