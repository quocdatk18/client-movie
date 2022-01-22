import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveMyvideoUser, userSelector } from '../../store/reducer/users/userSlice';
import { getVideobyId, videosSelectorId } from '../../store/reducer/video/videoSlice';
import VideoView from '../videoViews/VideoView';
import CommentVideo from './CommentVideo';
import './DetailsVideo.scss';

export default function DetailsVideo(props) {
    const videoId = useSelector(videosSelectorId)
    const userInfo = useSelector(userSelector)
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideobyId(id))
    }, [id, dispatch])
    const addVideo = (e) => {
        e.preventDefault()
        if (userInfo) {
            dispatch(saveMyvideoUser(videoId))

        } else {
            alert('xin vui lòng đăng nhập')
        }
    }
    return (
        <div className='detailvideo'>
            <div className="detailvideo--div">
                <div className="detailvideo-left">
                    <div className="left-top">
                        <div className=" w-50 left-img">
                            <div className="  div-left">
                                <div className="img">
                                    <img src={videoId?.image} alt="" />
                                </div>
                                <div >
                                    <ul className="about">
                                        <li>
                                            <Link onClick={addVideo} to='' className='btn-green'>
                                                Lưu Lại
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/videoId/${videoId?._id}/1`} className='btn-red'>
                                                Xem Anime
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-50 right-name" >
                            <div className="name">
                                <h1>{videoId?.name}</h1>
                            </div>
                            <div className="description">
                                <p>{videoId?.description}</p>
                            </div>

                        </div>
                    </div>
                    <div className="left-body">
                        {videoId && videoId?.list?.map((item, index) => {

                            return <li key={index}>
                                <Link to={`/videoId/${videoId?._id}/` + item.chapter}>{item.chapter}</Link>
                            </li>

                        })}
                    </div>
                    <CommentVideo videoId={videoId} />

                </div>
                <div className="detailvideo-right">
                    <VideoView />
                </div>
            </div>
        </div >

    )
}
