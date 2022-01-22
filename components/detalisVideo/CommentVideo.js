import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/reducer/users/userSlice';
import { commentVideo, getVideobyId } from '../../store/reducer/video/videoSlice';
import './CommentVideo.scss';
import { useParams } from 'react-router-dom'
import ShowComment from './ShowComment';

const styles = {
    container: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textareaDefaultStyle: {
        padding: 5,

        display: "block",
        resize: "none",
        // backgroundColor: "#eee",
    },
};
export default function CommentVideo({ videoId }) {
    const { id } = useParams()
    const allcomment = useSelector(state => state.videoReducer.videoId?.comments)
    const userInfo = useSelector(userSelector)
    const [value, setValue] = useState('')
    const textareaRef = useRef()
    const textAreaChange = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [value]);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userInfo) {
            const comment = {
                author: userInfo.name,
                isAdmin: userInfo.isAdmin,
                content: value,
                byUser: userInfo._id,
                avata: userInfo.avata
            }

            dispatch(commentVideo({ id, comment }))
            setValue('')
        }
        else alert('Đăng nhập để bình luận')
    };
    useEffect(() => {
        dispatch(getVideobyId(id))
    }, [id])
    return (
        <div className='comment'>
            <div className="comment--header">
                <h1> nội dung</h1>
                <p>{videoId?.description}</p>
            </div>
            <div className='comment--bottom'>
                <div className="top">
                    <h1>{allcomment?.length} bình luận </h1>
                    <div className="sort">
                        <span>Sắp xếp theo</span>
                        <select name="" id="">
                            <option value="">mới nhất</option>
                            <option value="">cũ nhất</option>
                        </select>
                    </div>
                </div>
                <div className="bottom">
                    <div className="comment-bottom">
                        <div className="img">
                            <img src={userInfo?.avata} alt="" />
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='user-comment'>
                                <textarea

                                    ref={textareaRef}
                                    style={styles.textareaDefaultStyle}
                                    onChange={textAreaChange}
                                    value={value}
                                    required
                                    placeholder='bình luận góp ý nhé bạn'
                                >
                                    {value}
                                </textarea>

                            </div>
                            <div className="submit">
                                <button type='submit'>Gửi</button>
                            </div>


                        </form>
                    </div>
                </div>
                <ShowComment allcomment={allcomment} videoId={videoId} />
            </div>
        </div>
    )
}
