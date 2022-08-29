import React, {useEffect, useState} from "react"
import './articolo.css'
import {Helmet} from "react-helmet-async"
import axios from "axios"
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import parseDate from "../../function/parseDate";
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import Card from "../../components/card/Card";
import rehypeRaw from 'rehype-raw'

export default function Articolo(){
  const navigate = useNavigate()
  const params = useParams();
  const [e, setE] = useState({})
  const [Found, setFound] = useState(true)
  const [correlated, setCorrelated] = useState([])
  const [foundCorrelated, setFoundCorrelated] = useState(false)
  
  useEffect(() => {
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/articles/${params.id}`)
    .then((res)=>{
      setE(res.data)
    })
    .catch(()=>{setFound(false)})
  },[params.id])    

  useEffect(()=>{
    axios.get(`https://sindaco-del-calciomercato.herokuapp.com/api/tags/${e.tag}`)
    .then((res)=>{
      if((res.data.length - 1) !== 0){
        const index = res.data.findIndex((element) => {return JSON.stringify(element) === JSON.stringify(e)});
        if (index > -1) { 
          res.data.splice(index, 1); 
        }
        setCorrelated(res.data)
        setFoundCorrelated(true)
      }else{
        setFoundCorrelated(false)
      }
    })
  },[e])  

  return(
    <>
      
      <Navbar/>
      {
      Found? 
      <>
      <div className="articolo-page">
        <Helmet>
          <title>{e.title}</title>
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
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="articolo-body" children={e.text}/>
      </div>
      {foundCorrelated && 
      <div className="correlated--container">
        <h2 className="correlated--title">Articoli correlati</h2>
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