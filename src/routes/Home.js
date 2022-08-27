import React, {useEffect, useState} from "react"
import axios from "axios"
import './home.css'
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useNavigate } from 'react-router-dom';
import parseDate from "../function/parseDate";
import { Helmet } from "react-helmet-async";

export default function Body(){
    const [news, setNews] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [lastPage, setLastPage] = useState(false)
    const [firstPage, setFirstPage] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
      axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/articles").then((res)=>{
      const a = res.data.slice(pageCount*10, 10*pageCount + 10)
      if(a.length < 10){
        setLastPage(true)
      }else{
        setLastPage(false)
      }
      if(pageCount !== 0){
        setFirstPage(false)
      }else{
        setFirstPage(true)
      }
      setNews(a)
      document.documentElement.scrollTop = 0;
      })
    }, [pageCount])
    
    function nextPage(){
      setPageCount(prevCount => {return prevCount+1})
    }
    function prevPage(){
      setPageCount(prevCount => {return prevCount-1})
    }

    const n = news.map((e,i)=>{
      return(
        <div key={e._id} id={`card${i}`} className={`card`} onClick={()=> navigate(`/articolo/${e._id}`)}>
          <img className="card--image" alt="" src={e.imageURL}/>
          <p className="card--date">{parseDate(e.date)} | {e.tag}</p>
          <h2 className="card--title">{e.title}</h2>
          <p className="card--subtitle">{e.subtitle}</p>
        </div>
      )
    })

    return(
        <div className="home-container">
          <Helmet>
          <meta
            name="description"
            content="Il Sindaco del calciomercato è un sito di notizie sempre aggiornate e da fonti verificate che vi tiene sempre aggiornati per non farvi perdere neache un colpo" 
          />
          </Helmet>
          <Navbar />
          {n}
          {!firstPage && <p className="prevPage" onClick={prevPage}>Torna alla pagina precedente</p>}
          {!lastPage && <p className="nextPage" onClick={nextPage}>Carica altre notizie</p>}
          <Footer />
        </div>
    )
}