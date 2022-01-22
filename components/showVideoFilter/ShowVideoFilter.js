
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo, videosSelector } from '../../store/reducer/video/videoSlice';
import Video from '../video/Video';
import VideoView from '../videoViews/VideoView';
import './ShowVideoFilter.scss';

export default function ShowVideoFilter() {

    return (
        <div className='showvideo'>
            <div className="showvideo--div">
                <div className="showvideo-left">
                    <Video />
                </div>
                <div className="showvideo-right">
                    <VideoView />
                </div>
            </div>

        </div>
    )
}
