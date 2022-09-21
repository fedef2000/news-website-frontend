import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Helmet} from "react-helmet-async"
import "./other.css"

export default function Donation(){
    return(
        <div>
            <Navbar />
            <Helmet>
              <title>Contattaci | Sindaco del calciomercato</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/contact`}/>
              <meta name="description" content={"Contatta il sindaco del calciomercato"} />
            </Helmet>
            <div className="other--page">
                <p>La vità e difficile, offrici una paglia</p>
                <br/>
            </div>
            <Footer />
        </div>
    )
}