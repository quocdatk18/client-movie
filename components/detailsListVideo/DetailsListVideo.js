import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getVideobyId, getVideoChapter, videoListget } from '../../store/reducer/video/videoSlice'
import CommentVideo from '../detalisVideo/CommentVideo'
import VideoView from '../videoViews/VideoView'
import './DetailsListVideo.scss'

export default function DetailsListVideo() {
    const { id, chapter } = useParams()

    const videoChapter = useSelector(state => state.videoReducer.videoChapter)
    const videoId = useSelector(state => state.videoReducer.videoId)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideobyId(id))
        dispatch(getVideoChapter({ id, chapter }))
    }, [id, chapter])

    return (
        <div className='list'>
            <div className="list--div">
                <div className="list-left">
                    <div className="left-top">
                        <iframe src={videoChapter.video}
                            frameBorder="0"></iframe>
                    </div>
                    <div className="left-body">
                        <div className="list-chapter">
                            {videoId && videoId?.list?.map((item, index) => {

                                return <li key={index}>
                                    <Link to={`/videoId/${videoId._id}/` + item.chapter}>{item.chapter}</Link>
                                </li>

                            })}
                        </div>
                    </div>
                    <CommentVideo videoId={videoId} />

                </div>
                <div className="list-right">
                    <VideoView />

                </div>
            </div>

        </div>
    )
}
