
import React from 'react';
import VideoView from '../videoViews/VideoView';
import Myvideos from './MyVideo';
import './MyVideo.scss';

export default function ShowVideoFilter() {

    return (
        <div className='showvideo'>
            <div className="showvideo--div">
                <div className="showvideo-left">
                    <Myvideos />
                </div>
                <div className="showvideo-right">
                    <VideoView />
                </div>
            </div>

        </div>
    )
}
