import React from 'react'
import './VideoView.scss'
import { StarTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateViews, videosSelector } from '../../store/reducer/video/videoSlice'
import { Link } from 'react-router-dom'
export default function VideoView() {
    const video = useSelector(videosSelector)
    const dispatch = useDispatch()
    return (
        <div className='videoview'>
            <div className="name">

                <h1><StarTwoTone className='icon' />
                    <span> Xem nhiều nhất</span>
                </h1>
            </div>
            <div className="video">
                <ul>
                    {video?.videoMost?.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link onClick={() => dispatch(updateViews(item._id))} style={{ width: '100%', display: 'flex' }} to={'/video/' + item._id}>
                                    <div className="img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="details">
                                        <h1>{item.name}</h1>
                                        <p>lượt xem :{item.views}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
