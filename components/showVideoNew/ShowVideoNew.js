
import React from 'react';
import Video from '../video/Video';
import VideoNew from '../videoNew/VideoNew';
import VideoView from '../videoViews/VideoView';
import './ShowVideoFilter.scss';

export default function ShowVideoNew() {

    return (
        <div className='showvideo'>
            <div className="showvideo--div">
                <div className="showvideo-left">
                    <VideoNew />
                </div>
                <div className="showvideo-right">
                    <VideoView />
                </div>
            </div>

        </div>
    )
}
