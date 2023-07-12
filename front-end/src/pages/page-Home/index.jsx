import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {URL} from '../../utils/constantes/urls'

function Home(){
    const [articles, setArticles ] = useState([]);

    useEffect(()=>{

        const fetchArticles = async () =>{
            try{ 
                const {data} = await axios.get(URL.getAllArticles)
            //console.log(data["hydra:member"])
            setArticles(data["hydra:member"])

            }catch(error){
                console.log(error)
            }
            
        }
        fetchArticles()
        
    },[])

    console.log(articles);
    return(
        <div>
            <h1>Page Home🛍️</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <img src={article.picture} style={{width: 200}}/>
                    <h2>{article.name}</h2>
                    <p>{article.price}</p>
                    <p>{article.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Home