import React, {useState} from "react"
import axios from "axios"
import Cookies from "js-cookie";
import './post.css'
import { useNavigate } from 'react-router-dom';

export default function Post(){
  const token = Cookies.get('token')
  const [formData, setFormData] = useState(
    {
        title: "", 
        subtitle: "", 
        text: "", 
        imageURL: ""
    }
  )
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const POST_URL = 'https://sindaco-del-calciomercato.herokuapp.com/api/articles';
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
        setErrMsg('Manca il titolo!!')
      }else if(!formData.subtitle){
        setErrMsg('Manca il sottotitolo!!')
      }else if(!formData.text){
        setErrMsg('Manca il testo!!')
      }else if(!formData.imageURL){
        setErrMsg('Manca l\'immagine!!')
      }
      
      else{
        try {
          console.log(formData)
          const response = await axios.post(POST_URL,
              formData,
              {
                  headers: { "x-auth-token": token }, 
              }
          );
          console.log(response)
          setSuccess(true);
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
      success ? <div className="inviato"><p className="inviato">articolo inviato!</p><button onClick={()=>{navigate('/')}}> torna alla home </button></div> : <div>
        <form className="formArticolo" onSubmit={handleSubmit}>
          <textarea
              className="form--title"
              type="text"
              placeholder="Titolo"
              onChange={handleChange}
              name="title"
              value={formData.title}
              autoComplete="off"
          /><textarea
              className="form--subtitle"
              type="text"
              placeholder="Sottotitolo"
              onChange={handleChange}
              name="subtitle"
              value={formData.subtitle}
              autoComplete="off"
          />
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
          <button>Pubblica</button>
        </form>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      </div>
      :
      <div>
        <p>Non sei Autorizzato ad accedere a questa pagina</p>
      </div>
    }
    </div>    
  )
}