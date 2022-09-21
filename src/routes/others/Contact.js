import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Helmet} from "react-helmet-async"
import "./other.css"

export default function Contact(){
    return(
        <div>
            <Navbar />
            <Helmet>
              <title>Sindaco del calciomercato | Contattaci</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/contact`}/>
              <meta name="description" content={"Contatta il sindaco del calciomercato"} />
            </Helmet>
            <div className="other--page">
                <p>Se hai bisogno di qualcosa o vuoi segnalare un problema contatta la redazione via mail</p>
                <br/>
                <p>redazione@sindacodelcalciomercato.it</p>
            </div>
            <Footer />
        </div>
    )
}