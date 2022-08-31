import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import parseDate from "../../function/parseDate";
import './article.css'

export default function Article(props) {
    const navigate = useNavigate()
    function handleClick(tag){
      if(!props.disableLink){
        navigate(`/tag/${tag}`)
        setTimeout(()=>{document.documentElement.scrollTop = 0},200)
      }
    }
    
    return(
        <> 
            <img className="articolo-image" alt="" src={props.imageURL}/>
            <div className="articolo--info">
                <p className="articolo--date" >{parseDate(props.date)} |</p> 
                <p className="articolo--tag" onClick={()=> handleClick(props.tag[0])}>{props.tag[0]}</p>
            </div>
            <h1 className="articolo-title">{props.title}</h1>
            <h2 className="articolo-subtitle">{props.subtitle}</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="articolo-body" children={props.text}/>
            <div className='articolo--tagContainer'>
            <p className='articolo--tagTitle'>Tag:</p>
            {props.tag.map((t,key)=>{
                if(key !== (props.tag.length -1)){
                    return <p className='articolo--allTags' key={key} onClick={()=> handleClick(t)} >{t},</p>
                }
                return <p className='articolo--allTags' key={key} onClick={()=> handleClick(t)} >{t}</p>
            })
            }
            </div>
        </>
    )
}
