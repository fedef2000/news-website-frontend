import React, {useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import './post.css'
import { useNavigate } from 'react-router-dom';
import parseDate from "../function/parseDate";

export default function Post(){
  const token = Cookies.get('token')
  const [formData, setFormData] = useState(
    {
        title: "", 
        subtitle: "", 
        text: "", 
        imageURL: "",
        tag: ""
    }
  )
  const [tags, setTags] = useState([]);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const POST_URL = 'https://sindaco-del-calciomercato.herokuapp.com/api/articles';
  
  useEffect(()=>{
    axios.get("https://sindaco-del-calciomercato.herokuapp.com/api/tags").then((res)=>{
          setTags(res.data)
        })
  },[])
  
  const navigate = useNavigate()
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
          setPending(true)
          console.log(formData)
          await axios.post(POST_URL,
              formData,
              {
                  headers: { "x-auth-token": token }, 
              }
          );
          setSuccess(true);
          setPending(false)
        } catch (err) {
          console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else{
              setPending(false)
              setErrMsg(err.response.data)
            }
        }
      }
    }

    return(
      <div>
    {token ? 
      success ? <div><p className="inviato">articolo inviato!</p><button onClick={()=>{navigate('/')}}> torna alla home </button></div> 
      : pending ? <p className="inviato">In attesa di risposta dal Server</p>
      :
      <div >
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
          <button>Pubblica</button>
        </form>

        <h2>Anteprima</h2>
        <div className="anteprima">
          <img className="articolo-image" alt="" src={formData.imageURL}></img>
          <p className="card--date">{parseDate((new Date()).toISOString())} | {formData.tag}</p>
          <h1 className="articolo-title">{formData.title}</h1>
          <h2 className="articolo-subtitle">{formData.subtitle}</h2>
          <p className="articolo-body">{formData.text}</p>
        </div>
      </div>
      :
      <div>
        <p>Non sei Autorizzato ad accedere a questa pagina</p>
      </div>
    }
    </div>    
  )
}