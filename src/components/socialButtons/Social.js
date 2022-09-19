import {
    WhatsappShareButton,
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    RedditShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    TelegramIcon,
    RedditIcon,
} from "next-share";

  export default function Socia(props){
    return(
        <div className={props.className}>
            <FacebookShareButton url={`https://www.sindacodelcalciomercato.it/${props.titleUrl}`}>
                <FacebookIcon size={35} borderRadius={10}/>
            </FacebookShareButton>
            <WhatsappShareButton url={`https://www.sindacodelcalciomercato.it/${props.titleUrl}`}>
                <WhatsappIcon size={35} borderRadius={10}/>
            </WhatsappShareButton>
            <TwitterShareButton url={`https://www.sindacodelcalciomercato.it/${props.titleUrl}`}>
                <TwitterIcon size={35} borderRadius={10}/>
            </TwitterShareButton>
            <TelegramShareButton url={`https://www.sindacodelcalciomercato.it/${props.titleUrl}`}>
                <TelegramIcon size={35} borderRadius={10}/>
            </TelegramShareButton>
            <RedditShareButton url={`https://www.sindacodelcalciomercato.it/${props.titleUrl}`}>
                <RedditIcon size={35} borderRadius={10}/>
            </RedditShareButton>
        </div>
    )
  }