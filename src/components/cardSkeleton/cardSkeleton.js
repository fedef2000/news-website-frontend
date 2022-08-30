import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './cardSkeleton.css'

export default function CardSkeleton(){
    return(
        <div className={`skeleton`}>
            <Skeleton className="skeleton--image" alt="" />
            <Skeleton className="skeleton--info" /> 
            <Skeleton count={2} className="skeleton--title" />
            <Skeleton count={3} inline={true} className="skeleton--subtitle" />
        </div>
    )
}