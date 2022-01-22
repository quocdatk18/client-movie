import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo, getVideobyType, updateViews, videosSelector, videosSelectorType } from '../../store/reducer/video/videoSlice';
import './VideoNew.scss'
import { CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function VideoNew() {
    const video = useSelector(videosSelector)
    const dispatch = useDispatch()
    return (
        <div className='video'>
            <div className="video--div">
                <div className="title">
                    <h1>Danh sách video  mới nhất</h1>
                </div>
                <div className="video-colum">
                    <div>
                        <div>
                            {video.videoNew?.length > 0 ? <ul>
                                {video.videoNew?.map((item, index) => {
                                    return <li key={index}>
                                        <Link to={'/video/' + item._id} onClick={() => dispatch(updateViews(item._id))}>
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
                                                        <span> {item.views ? item.views : 0}</span>
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
