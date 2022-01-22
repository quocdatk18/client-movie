import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo, getVideobyType, updateViews, videosSelector, videosSelectorType } from '../../store/reducer/video/videoSlice';
import './Video.scss'
import { CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Video() {
    const videoType = useSelector(videosSelectorType)
    const keyFilter = useSelector(state => (state.videoReducer.Key))



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideobyType(keyFilter.Type))
    }, [dispatch, keyFilter.Type])
    return (
        <div className='video'>
            <div className="video--div">
                <div className="title">
                    <h1>Danh sách video {keyFilter.Type === 'Tất cả' ? '' : keyFilter.Type} phát theo {""}
                        {keyFilter.Sort ? keyFilter.Sort : " lượt xem"} {keyFilter.Status === 'Tất cả' ? "" : keyFilter.Status} </h1>
                </div>
                <div className="video-colum">
                    <div>
                        <div>
                            {videoType?.length > 0 ? <ul>
                                {videoType?.map((item, index) => {
                                    return <li key={index}>
                                        <Link onClick={() => dispatch(updateViews(item._id))} to={'/video/' + item._id}>
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
                                    </li>
                                })}


                            </ul>
                                : <h1>Hiện chưa có video thể loại bạn cần</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
