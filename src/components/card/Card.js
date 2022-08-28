import { useNavigate } from 'react-router-dom';
import parseDate from "../../function/parseDate";
import './card.css'
export default function Card(props) {
    const navigate = useNavigate()
    return(
        <div className={`card`}>
          <img className="card--image" alt="" src={props.imageURL} onClick={()=> navigate(`/articolo/${props._id}`)}/>
          <div className="card--info">
            <p className="card--date" onClick={()=> navigate(`/articolo/${props._id}`)}>{parseDate(props.date)} |</p> 
            <p className="card--tag" onClick={()=> navigate(`/tag/${props.tag}`)}>{props.tag}</p>
          </div>
          <h2 className="card--title" onClick={()=> navigate(`/articolo/${props._id}`)}>{props.title}</h2>
          <p className="card--subtitle" onClick={()=> navigate(`/articolo/${props._id}`)}>{props.subtitle}</p>
        </div>
    )
}

