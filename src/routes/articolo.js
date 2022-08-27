import React, {useEffect, useState} from "react"
import './articolo.css'
import {Helmet} from "react-helmet-async"
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import parseDate from "../function/parseDate";
import { useNavigate } from 'react-router-dom';

export default function Articolo(){
  const navigate = useNavigate()
  const params = useParams();
  const [e, setE] = useState({})
  const [Found, setFound] = useState(true)
  useEffect(() => {
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/articles/${params.id}`)
    .then((res)=>{
      setE(res.data)

      
    })
    .catch(() =>{
      setFound(false)
    })
  },[params.id])    
  

  return(
    <>
      
      <Navbar/>
      {
      Found? 
      <div className="articolo-page">
        <Helmet>
          <title>{`Sindaco del calciomercato | ${e.title}`}</title>
          <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/articolo/${params.id}`}/>
          <meta name="description" content={e.text} />
        </Helmet>
        <img className="articolo-image" alt="" src={e.imageURL}/>
        <div className="articolo--info">
            <p className="articolo--date" onClick={()=> navigate(`/articolo/${e._id}`)}>{parseDate(e.date)} |</p> 
            <p className="articolo--tag" onClick={()=> navigate(`/tag/${e.tag}`)}>{e.tag}</p>
          </div>
        <h1 className="articolo-title">{e.title}</h1>
        <h2 className="articolo-subtitle">{e.subtitle}</h2>
        <p className="articolo-body">{e.text}</p>
      </div> 
      :
      <div>
        <p className="nonTrovato">Articolo non trovato</p>
      </div>
      }
      <Footer/>
    </>
  )
}