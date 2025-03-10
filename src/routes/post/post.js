import React, {useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import './post.css'
import { useNavigate } from 'react-router-dom';
import Article from "../../components/article/Article";
import titleToUrl from "../../function/ParseTitle"

export default function Post(){
  const token = Cookies.get('token')
  const [formData, setFormData] = useState(
    {
        title: Cookies.get('title'), 
        subtitle: Cookies.get('subtitle'), 
        text: Cookies.get('text'), 
        imageURL: Cookies.get('imageURL'),
        titleUrl: Cookies.get('titleUrl'),
        tag: []
    }
  )

  console.log(formData)

  const [tags, setTags] = useState([]);
  const [tagArray, setTagArray] = useState([ 
  <input
    key={0}
    list="tags"
    className="form--tag"
    type="text"
    placeholder="tag"
    onChange={handleTagChange}
    name={`tag0`}
    value={formData.tag[0]}
    autoComplete="off"
  />
  ]);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate()
  const POST_URL = 'https://sindaco-backend.onrender.com/api/articles';
  
  //chiamata a /api/tag per avere tutti i tag come suggerimenti nel <datalist>
  useEffect(()=>{
    axios.get("https://sindaco-backend.onrender.com/api/tags").then((res)=>{
          setTags(res.data)
        })
  },[])
  

  function handleChange(event) {
    const {name, value} = event.target
    Cookies.set(name, value)
    if(name === 'title'){
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          title:  value,
          titleUrl: titleToUrl(value)
        }
      })
    }else{
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]:  value
        }
      })
    }
  }

  function handleTagChange(event){
    const index = event.target.name[3]
    setFormData(prevFormData => {
      let result = {...prevFormData}
      result.tag[index] = event.target.value
      return result
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
      }else if(!formData.tag[0]){
        setErrMsg('Metti almeno un tag!')
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
          Cookies.remove('title')
          Cookies.remove('subtitle')
          Cookies.remove('text')
          Cookies.remove('imageURL')
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
    
    function addTag(){
      setTagArray(prev => {return prev.concat(  
      <input 
        key={prev.length}
        list="tags"
        className="form--tag"
        type="text"
        placeholder="tag"
        onChange={handleTagChange}
        name={`tag${prev.length}`}
        value={formData.tag[prev.length]}
        autoComplete="off"
      />
      )})
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
          {tagArray}
          <button className="form--tagButton" form="none" onClick={addTag}>Aggiungi un tag</button>  
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
          <Article date={(new Date()).toISOString()} disableLink={true} {...formData} />            
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