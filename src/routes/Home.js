import React, {useEffect, useState} from "react"
import axios from "axios"
//import {Buffer} from 'buffer';
import './home.css'
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useNavigate } from 'react-router-dom';
//import CardSkeleton from "../components/CardSkeleton";



export default function Body(){
    const [news, setNews] = useState([])
    //const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/articles").then((res)=>{
          setNews(res.data)
          //setLoaded(true)
        })
      }, [])
    
    const n = news.map((e,i)=>{
      /*
      const b64 = new Buffer.from(e.image.data.data).toString('base64')
      const mimeType = 'image/png'   
      const src=`data:${mimeType};base64,${b64}`
      */
      return(
        <div key={e._id} id={`card${i}`} className={`card`} onClick={()=> navigate(`/articolo/${e._id}`)}>
          <img className="article-image" alt="" src={e.imageURL}/>
          <h2 className="card--title">{e.title}</h2>
          <p className="card--subtitle">{e.subtitle}</p>
        </div>
      )
    })

    return(
        <div className="home-container">
          <Navbar />
          {n}
         <Footer />
        </div>
    )
}