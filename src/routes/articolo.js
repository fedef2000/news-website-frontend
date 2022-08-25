import React, {useEffect, useState} from "react"
import './articolo.css'
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
//import {Buffer} from 'buffer';

export default function Articolo(){
  const params = useParams();
  const [e, setE] = useState({})
  const [Found, setFound] = useState(true)
  //let [src, setSrc] = useState('');

  useEffect(() => {
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/articles/${params.id}`)
    .then((res)=>{
      setE(res.data)
      //const b64 = new Buffer.from(res.data.image.data.data).toString('base64')
      //const mimeType = 'image/png'   
      //setSrc(`data:${mimeType};base64,${b64}`)
      
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
        <h1 className="articolo-title">{e.title}</h1>
        <img className="articolo-image" alt="" src={e.imageURL}/>
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