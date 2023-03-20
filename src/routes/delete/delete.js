import React, {useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import './delete.css'
import Card from "../../components/card/Card"
import { useNavigate } from 'react-router-dom';

export default function Delete(){
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const [articles, setArticles] = useState([])
    const [selected, setSelected] = useState({})
    const [confirm, setConfirm] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
        axios.get("https://sindaco-backend.onrender.com/api/articles").then((res)=>{
            setArticles(res.data)
        })
    },[])

    useEffect(()=>{
        if(Object.keys(selected).length > 0 && confirm){
            const API_DELETE = `https://sindaco-backend.onrender.com/api/articles/${selected._id}`
            axios.delete(API_DELETE,{headers: { 'x-auth-token': token}})
            .then((res)=>{
                console.log('articolo eliminato')
                setSuccess(true)
            })
            .catch((err)=>{
                console.log('errore')
                console.log(err)
            })
        }
    },[confirm, token, selected])
    
    return(
        <div>
        {token ?
            success ? <div><p className="inviato">articolo cancellato!</p><button onClick={()=>{navigate('/')}}> torna alla home </button></div> 
            :
            Object.keys(selected).length === 0? 
              <div>
                <h1>quale articolo vuoi cancellare?</h1>
                {articles.map((a,key) => {
                    return (
                        <div key={key} className="delete--option">
                        <p className="delete--article" onClick={()=>{setSelected(a)}}>{a.title}</p>
                        </div>)
                })  
                }
              </div>
            :<div>
                <br/>
                <h2>Sei Sicuro di voler cancellare questo articolo?</h2>
                <br/>
                <h2>Una volta cancellato non si può più recuperare</h2>
                <br/>
                <Card disableLink={true} {...selected}/>
                <button className="delete--no" onClick={()=>{setSelected({})}}>No, Torna indietro</button>
                <br />
                <button className="delete--yes" onClick={()=>{setConfirm(true)}}>Si sono sicuro</button>
            </div>
        :
        <div>
            <p>Non sei Autorizzato ad accedere a questa pagina</p>
        </div>
        }
        </div>    
  )
}