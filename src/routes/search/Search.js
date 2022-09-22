import { useState } from "react";
import axios from "axios"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card"
import {Helmet} from "react-helmet-async"
import "./search.css"

export default function Donation(){
    const [str, setString] = useState("")
    const [articles, setArticles] = useState([])
    const [pending, setPending] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [error, setError] = useState(false)

    function handleChange(event) {
        setString(event.target.value)
    }

    const handleSubmit = async() => {
        setPending(true)
        try{
            const results = await axios.post("https://sindaco-del-calciomercato.herokuapp.com/api/articles/search",
            {
                string: str
            }
            );
            setPending(false)
            setNotFound(false)
            setError(false)
            setArticles(results.data)
            setLoaded(true)
        }catch(err){
            if(err.response.status === 404){
                setNotFound(true)
            }else{
                setError(true)
            }
            setPending(false)
        }

    }

    return(
        <div>
            <Navbar />
            <Helmet>
              <title>Cerca articolo | Sindaco del calciomercato</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/search`}/>
              <meta name="description" content={"Cerca un articolo tramite parola chiave"} />
            </Helmet>
            <div className="other--page">
                <input
                    type="text"
                    placeholder="Che parola vuoi cercare?"
                    onChange={handleChange}
                    value={str}
                />
                <button onClick={handleSubmit}>Avvia ricerca</button>
            </div>
            <br/>
            {
            pending ?
                <div><p>ricerca in corso...</p></div>
            :
            notFound?
            <p>Nessun articolo trovato!</p>
            :    
            error?
            <p>Si è verificato un errore</p>
            :    
            loaded &&
                <div className="search--results">
                    {articles.map((a,key) => {return <Card key={key} {...a} />})}
                </div>}
            <Footer />
        </div>
    )
}