import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Helmet} from "react-helmet-async"
import "./search.css"

export default function Donation(){
    return(
        <div>
            <Navbar />
            <Helmet>
              <title>Cerca articolo | Sindaco del calciomercato</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/search`}/>
              <meta name="description" content={"Cerca un articolo tramite parola chiave"} />
            </Helmet>
            <div className="other--page">
                <p>In fase di sviluppo</p>
            </div>
            <Footer />
        </div>
    )
}