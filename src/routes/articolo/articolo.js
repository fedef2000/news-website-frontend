import React, {useEffect, useState} from "react"
import './articolo.css'
import {Helmet} from "react-helmet-async"
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card";
import Article from "../../components/article/Article";

export default function Articolo(){
  const params = useParams();
  const [e, setE] = useState({})
  const [Found, setFound] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [correlated, setCorrelated] = useState([])
  const [foundCorrelated, setFoundCorrelated] = useState(false)
  
  useEffect(() => { //chiamata per ricevre dati dell'articolo
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/articles/title/${params.titleUrl}`)
    .then((res)=>{
      setE(res.data)
      setLoaded(true)
    })
    .catch(()=>{setFound(false)})
  },[params.titleUrl])    

  useEffect(()=>{ //chiamata per ricevere articoli correlati
    if(e.tag){
      axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/tags/${e.tag[0]}`)
      .then((res)=>{
        if((res.data.length - 1) !== 0){
          const index = res.data.findIndex((element) => {return JSON.stringify(element) === JSON.stringify(e)});
          if (index > -1) { 
            res.data.splice(index, 1); 
          }
          setCorrelated(prev => {return [...prev, ...res.data]})
          setFoundCorrelated(true)
        }else{
          setFoundCorrelated(false)
        }
      })
      axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/articles`)
      .then((res)=>{
          const index = res.data.findIndex((element) => {return JSON.stringify(element) === JSON.stringify(e)}); //toglie dalla lista l'articolo della pagina 
          if (index > -1) { 
            res.data.splice(index, 1); 
          }
          setCorrelated(prev => {
            return [...prev, ...res.data]
          })
      })
    }
  },[e])  

  return(
    <>
      
      <Navbar/>
      {
      Found? 
      loaded && <>
      <div className="articolo-page">
        <Helmet>
          <title>{e.title}</title>
          <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/articolo/${params.id}`}/>
          <meta name="description" content={e.text} />
        </Helmet>
        <Article {...e}/>
      </div>
      {foundCorrelated && 
      <div className="correlated--container">
        <h2 className="correlated--title">Leggi anche</h2>
        {correlated.map((article) => {return <Card key={article._id} {...article}/>})}
      </div>
      }
      </> 
      :
      <div>
        <p className="nonTrovato">Articolo non trovato</p>
      </div>
      }
      <Footer/>
    </>
  )
}