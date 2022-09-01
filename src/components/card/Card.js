import { useNavigate } from 'react-router-dom';
import parseDate from "../../function/parseDate";
import './card.css'
export default function Card(props) {
    const navigate = useNavigate()
    function handleClick(){
      if(!props.disableLink){
        navigate(`/${props.titleUrl}`)
        setTimeout(()=>{document.documentElement.scrollTop = 0},200)
      }
    } 
    return(
        <div className={`card`} > 
          <img className="card--image" alt="" src={props.imageURL} onClick={handleClick}/>
          <div className="card--info">
            <p className="card--date" onClick={handleClick}>{parseDate(props.date)} |</p> 
            <p className="card--tag" onClick={()=> navigate(`/tag/${props.tag[0]}`)}>{props.tag[0]}</p>
          </div>
          <h2 className="card--title" onClick={handleClick}>{props.title}</h2>
          <p className="card--subtitle" onClick={handleClick}>{props.subtitle}</p>
        </div>
    )
}

