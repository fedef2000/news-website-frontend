import React, {useEffect, useState} from "react"
import './tag.css'
import {Helmet} from "react-helmet-async"
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import parseDate from "../function/parseDate";
import { useNavigate } from 'react-router-dom';

export default function Tag(){
  const params = useParams();
  const [articles, setArticles] = useState([])
  const [Found, setFound] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/tags/${params.tag}`)
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
                <div className="card" key={key}>
                    <img className="card--image" alt="" src={article.imageURL} onClick={()=> navigate(`/articolo/${article._id}`)}/>
                    <p className="card--info" onClick={()=> navigate(`/articolo/${article._id}`)}>{parseDate(article.date)}</p>
                    <h1 className="card--title" onClick={()=> navigate(`/articolo/${article._id}`)}>{article.title}</h1>
                    <h2 className="card--subtitle" onClick={()=> navigate(`/articolo/${article._id}`)}>{article.subtitle}</h2>
                </div>
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