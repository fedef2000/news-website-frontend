import React, {useEffect, useState} from "react"
import './articolo.css'
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import parseDate from "../function/parseDate";

export default function Articolo(){
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
        <img className="articolo-image" alt="" src={e.imageURL}/>
        <p className="articolo--date">{parseDate(e.date)}</p>
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