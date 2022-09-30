
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Helmet} from "react-helmet-async"
import "./donation.css"
import { useState } from "react";
import sigarettaImg from '../../images/sigaretta.png'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function Paglia(){
    return(
        <img height={"50px"} alt='' src={sigarettaImg}/>
    )
}
function Pack(){
    return(
        <img  height={"50px"} alt='' src='https://thumbs.dreamstime.com/b/pacchetto-di-sigarette-44110753.jpg'/>
    )
}


export default function Donation(){
    const [count, setCount] = useState(1)
    const [paglie, setPaglie] = useState([<Paglia/>,<Paglia/>,<Paglia/>,<Paglia/>]) //count starts at 1 so there's 4 paglie
    const [pacchetti, setPacchetti] = useState([])
    const [{ options }, dispatch] = usePayPalScriptReducer();

    function Draw(n){
        const pack = Math.trunc(n/5) //one pack costs 5€
        const paglie = Math.trunc((n%5)/0.25) //one paglia costs 0.25€
        setPaglie([])
        setPacchetti([])
        for(let i = 0; i<pack;i++){
            setPacchetti(prevPack => {return [...prevPack, <Pack />]})
        }
        for(let i = 0; i<paglie;i++){
            setPaglie(prevPaglie => {return [...prevPaglie, <Paglia />]})
        }
    }

    function handleDown(){
        if(count > 0){
            setCount(prevCount => {return prevCount-1})
            Draw(count-1)
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                },
            })
        }
    }
    function handleUp(){
        setCount(prevCount => {return prevCount+1})
        Draw(count+1)
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
            },
        })
    }

    function handleChange(event){
        setCount(Number(event.target.value))
        Draw(Number(event.target.value))
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
            },
        })
    }
    return(

        <div>
            <Navbar />
            <Helmet>
              <title>Donazione | Sindaco del calciomercato</title>
              <link rel="canonical" href={`https://www.sindacodelcalciomercato.it/offrici-una-paglia`}/>
              <meta name="description" content={"Dona qualche eruo al sindaco del calciomercato"} />
            </Helmet>
            
            <div className="other--page">
                <p>La vità è difficile</p>
                <p>Aiutaci donando qualche euro</p>
                <button onClick={handleDown}>-</button>
                <input
                type='number'
                value={Number(count).toString()}
                inputMode="numeric"
                onChange={handleChange} 
                />
                <label>€</label>
                <button onClick={handleUp}>+</button>
                <br/>
                <p>Quante paglie ci posso comprare</p>
                <div className="preview">
                    <div className="donation--paglie" style={{display:"flex"}}>
                        {paglie.map((p,key) => {return <Paglia key={key} /> })}
                    </div>
                    <div className="donation--pack">
                        {pacchetti.map((p,key) => {return <Pack key={key} />})}
                    </div>
                </div>
                
                    <PayPalButtons 
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: count,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                alert(`Grazie per la donazione ${name}`);
                            });
                        }}
                        />
            </div>
            <Footer />
        </div>
    )
}

/*

*/