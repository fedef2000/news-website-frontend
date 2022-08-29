import React, {useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import './update.css'
import { useNavigate } from 'react-router-dom';
import parseDate from '../../function/parseDate'
import ReactMarkdown from 'react-markdown'

export default function Update(){
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const [articles, setArticles] = useState([])
    const [selected, setSelected] = useState({})
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({})
    const [errMsg, setErrMsg] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(()=>{
        axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/articles").then((res)=>{
            setArticles(res.data)
        })
    },[])

    useEffect(()=>{
      axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/tags").then((res)=>{
            setTags(res.data)
          })
    },[])
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if(!formData.title){
        setErrMsg('Manca il titolo!')
      }else if(!formData.subtitle){
        setErrMsg('Manca il sottotitolo!')
      }else if(!formData.text){
        setErrMsg('Manca il testo!')
      }else if(!formData.imageURL){
        setErrMsg('Manca l\'immagine!')
      }else if(!formData.tag){
        setErrMsg('Manca il tag!')
      }else{
        try {
            console.log(formData)
            const API_UPDATE = `https://sindaco-del-calciomercato.herokuapp.com/api/articles/${selected._id}`
            axios.put(API_UPDATE, formData, {headers: { 'Content-Type':'application/json', 'x-auth-token': 'token'}})
            .then((res)=>{
                console.log('articolo aggiornato')
                setSuccess(true)
            })
        } catch (err) {
          console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else{
              setErrMsg(err.response.data)
            }
        }
      }
    }  



    return(
        <div>
        {token ?
            success ? <div><p className="inviato">articolo aggiornato!</p><button onClick={()=>{navigate('/')}}> torna alla home </button></div> 
            :
            Object.keys(selected).length === 0? 
              <div>
                <h1>quale articolo vuoi aggiornare?</h1>
                {articles.map((a,key) => {
                    return (
                        <div key={key} className="delete--option">
                        <p className="delete--article" onClick={()=>{setSelected(a); setFormData({title:a.title, subtitle:a.subtitle, text: a.text, tag:a.tag, imageURL:a.imageURL})}}>{a.title}</p>
                        </div>)
                })  
                }
              </div>
            :<div>
                <br/>
                <form className="formArticolo" onSubmit={handleSubmit}>
                    <textarea
                        className="form--title"
                        type="text"
                        placeholder="Titolo"
                        onChange={handleChange}
                        name="title"
                        value={formData.title}
                        autoComplete="off"
                    />

                    <textarea
                        className="form--subtitle"
                        type="text"
                        placeholder="Sottotitolo"
                        onChange={handleChange}
                        name="subtitle"
                        value={formData.subtitle}
                        autoComplete="off"
                    />
                    <input 
                    list="tags"
                    className="form--tag"
                    type="text"
                    placeholder="tag"
                    onChange={handleChange}
                    name="tag"
                    value={formData.tag}
                    autoComplete="off"
                    />  
                    <datalist id="tags">
                      {tags.map((tag, key) => {return <option key={key} value={tag} />})}
                    </datalist>
                    <textarea
                        className="form--text"
                        type="textarea"
                        placeholder="testo"
                        onChange={handleChange}
                        name="text"
                        value={formData.text}
                        autoComplete="off"

                    />
                    <input
                        className="form--url"
                        type="url"
                        placeholder="link all'immagine"
                        onChange={handleChange}
                        name="imageURL"
                        value={formData.imageURL}
                        autoComplete="off"
                    />
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Anteprima</h2>
                    <div className="anteprima">
                      <img className="articolo-image" alt="" src={formData.imageURL}></img>
                      <div className="articolo--info">
                        <p className="articolo--date" >{parseDate((new Date()).toISOString())} |</p> 
                        <p className="articolo--tag" >{formData.tag}</p>
                      </div>
                      <h1 className="articolo-title">{formData.title}</h1>
                      <h2 className="articolo-subtitle">{formData.subtitle}</h2>
                      <ReactMarkdown linkTarget="_blank" className="articolo-body" children={formData.text}/>
                    </div>
                    <button>Aggiorna</button>
                </form>
            </div>
        :
        <div>
            <p>Non sei Autorizzato ad accedere a questa pagina</p>
        </div>
        }
        </div>    
  )
}