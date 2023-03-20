import React, {useEffect, useState} from "react"
import './tag.css'
import {Helmet} from "react-helmet-async"
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card";

export default function Tag(){
  const params = useParams();
  const [articles, setArticles] = useState([])
  const [Found, setFound] = useState(true)
  useEffect(() => {
    axios.get(`https://sindaco-backend.onrender.com/api/tags/${params.tag}`)
    .then((res)=>{
        if(res.data.length === 0){
            setFound(false)
        }else{
            setArticles(res.data)
        }
    })
    .catch(() =>{
      setFound(false)
    })
  },[params.tag])    
  

  return(
    <>
      
      <Navbar/>
      {
      Found? 
      <div className="articolo-page">
        <Helmet>
          <title>{`Sindaco del calciomercato | ${params.tag}`}</title>
          <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/tag/${params.tag}`}/>
          <meta name="description" content={`Leggi tutte le ultime notizie su ${params.tag}`} />
        </Helmet>
        <h1 className="tag--title">{`Tutti gli articoli per ${params.tag}`}</h1>
        {articles.map((article, key) => {
            return(
                <Card key={key} {...article}/>
            )
        })}

      </div> 
      :
      <div>
        <p className="nonTrovato">Tag non trovato</p>
      </div>
      }
      <Footer/>
    </>
  )
}