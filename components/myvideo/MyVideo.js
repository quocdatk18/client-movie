import { CommentOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyvideoUser, unSaveMyvideoUser, userMyvideoSelector, userSelector } from '../../store/reducer/users/userSlice';
import { getVideobyId, videosSelectorId } from '../../store/reducer/video/videoSlice';
import './MyVideo.scss';
import deleteimg from './delete.png'

const style = {
    width: '23px',
    height: '22px',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'pointer'

}

export default function Video() {
    const userInfo = useSelector(userSelector)
    const myVideoUser = useSelector(userMyvideoSelector)
    const videoId = useSelector(videosSelectorId)

    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(getMyvideoUser(userInfo))


    }, [userInfo, dispatch])
    const deleteVideo = (item) => {
        dispatch(unSaveMyvideoUser(item))
        window.location.reload()
    }

    return (
        <div className='video'>
            <div className="video--div">
                <div className="title">
                    <h1>Danh sách video Đã lưu</h1>
                </div>
                <div className="video-colum">
                    <div>
                        <div>
                            {myVideoUser?.length > 0 ? <ul>
                                {myVideoUser && myVideoUser?.map((item, index) => {
                                    return <li key={index}>
                                        <Link to={'/video/' + item._id}>
                                            <div className="video-thumbnail">
                                                <img src={item.image} alt="" />

                                            </div>
                                            <div className="video-meta">
                                                <div className="name">
                                                    <h1 className='h1'>{item.name}</h1>
                                                </div>
                                                <div className='about'>

                                                    <div>
                                                        <CommentOutlined />
                                                        <span> {item.views}</span>
                                                    </div>
                                                    <div>
                                                        <h2>{item.type}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <img onClick={() => deleteVideo(item)} style={style} src={deleteimg} alt="" />
                                    </li>
                                })}


                            </ul>
                                : <h1>Bạn chưa lưu phim nào</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
