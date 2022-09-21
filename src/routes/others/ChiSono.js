import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Helmet} from "react-helmet-async"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import "./other.css"

export default function ChiSono(){

    return(
        <div>
            <Navbar />
            <Helmet>
              <title>Sindaco del calciomercato | Chi sono</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/chi-sono`}/>
              <meta name="description" content={"Chi è il sindaco del calciomercato"} />
            </Helmet>
            <div className="other--page">
                <ReactMarkdown rehypePlugins={[remarkGfm]} className="articolo-body" children={
`
## Chi sono?
Davvero c'è qualcuno che non mi conosce?  
Sono un ex agente FIFA, attuale procuratore sportivo e intermediario di mercato, nella mia carriera ho partecipato a migliaia di movimenti di mercato.
Tutto è cominciato nel 2005 quando mi sono diplomato a Londra presso la [Royal Academy](https://inazumaeleven.fandom.com/it/wiki/Royal_Academy), da li in poi il mio progresso non si è più fermato, fino ad arrivare nell'elite del calcio mondiale.
Dopo anni in cui tutti i miei fan chiedevano una piattaforma per rimanere in contatto con me e avere tutte le news in anteprima, ho deciso di aprire questo sito web per accontentarli.

`}
                />
                
            </div>
            <Footer />
        </div>
    )
}