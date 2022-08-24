import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton() {
    return (
        <div id='card0'>
            <div className='image'>
                <Skeleton/>
            </div>
            <div className='title'>
                <Skeleton/>
            </div>
            <div className='subtitle'>
                <Skeleton/>
            </div>
        </div>
    )
}