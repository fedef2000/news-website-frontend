import React, {useEffect, useState} from "react"
import axios from "axios"
import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet-async";
import Card from "../../components/card/Card";

export default function Body(){
    const [news, setNews] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [lastPage, setLastPage] = useState(false)
    const [firstPage, setFirstPage] = useState(true)
    const [loaded, setLoaded] = useState(false)
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
      setLoaded(true)
      document.documentElement.scrollTop = 0;
      })
    }, [pageCount])
    
    function nextPage(){
      setLoaded(false)
      setPageCount(prevCount => {return prevCount+1})
    }
    function prevPage(){
      setLoaded(false)
      setPageCount(prevCount => {return prevCount-1})
    }

    return(
        <div className="home-container">
          <Helmet>
          <meta
            name="description"
            content="Il Sindaco del calciomercato è un sito di notizie sempre aggiornate e da fonti verificate che vi tiene sempre aggiornati per non farvi perdere neache un colpo" 
          />
          </Helmet>
          <Navbar />
          {loaded && 
          <div className="card--container">
          {news.map((n)=>{return <Card key={n._id} {...n}/>})}
          {!firstPage && <p className="prevPage" onClick={prevPage}>Torna alla pagina precedente</p>}
          {!lastPage && <p className="nextPage" onClick={nextPage}>Carica altre notizie</p>}
          <Footer />
          </div>
            
         }
         </div>
    )
}