import React, {useEffect, useState} from "react"
import axios from "axios"
import './home.css'
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useNavigate } from 'react-router-dom';
import parseDate from "../function/parseDate";


export default function Body(){
    const [news, setNews] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/articles").then((res)=>{
          setNews(res.data)
        })
      }, [])
    
    const n = news.map((e,i)=>{

      return(
        <div key={e._id} id={`card${i}`} className={`card`} onClick={()=> navigate(`/articolo/${e._id}`)}>
          <img className="card--image" alt="" src={e.imageURL}/>
          <p className="card--date">{parseDate(e.date)}</p>
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