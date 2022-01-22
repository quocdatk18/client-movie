import { WechatOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector } from "../../store/reducer/users/userSlice";
import { deleteComment, getVideobyId, repCommentVideo } from "../../store/reducer/video/videoSlice";
import RepCommentVideo from "./RepCommentVideo";
import './ShowComment.scss';


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
export default function ShowComment({ allcomment, videoId }) {
    const { id } = useParams()
    const userInfo = useSelector(userSelector)


    const [repCmt, setRepCmt] = useState({ key: "", status: false });
    const showRepComment = (id) => {
        setRepCmt({ key: id, status: !repCmt.status });
    };
    // const [value, setValue] = useState('')
    const textareaRef = useRef()
    const textAreaChange = (e) => {
        setRepValue(e.target.value)
    }
    const [repValue, setRepValue] = useState("");

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [repValue]);
    const dispatch = useDispatch();

    const handleRepComment = (value) => {
        if (userInfo) {
            const comment = {
                idComment: repCmt.key,
                isAdmin: userInfo.isAdmin,
                content: repValue,
                nameUser: userInfo.name,
                byUser: userInfo._id,
                avata: userInfo.avata
            };

            dispatch(repCommentVideo({ id, comment }))
            // dispatch(repCommentProduct(id, comment));
            setRepValue("");
            setRepCmt({ key: "", status: false });
        } else alert("Đăng nhập để bình luận");
    };
    const deleteCmt = async (e, item) => {
        e.preventDefault()
        const _id = videoId._id
        await dispatch(deleteComment({ item, _id }))
    }

    return (
        <div className='showcomment'>
            <ul>
                {allcomment?.map((item, index) => {
                    return <li key={index} className="comments-main">
                        <div className="comments-content">
                            <div className="name">
                                <img src={item.avata} alt="" />
                            </div>
                            <div className="comments">
                                <span>{item.author}</span>
                                <p>{item.content}</p>
                                <DeleteOutlined onClick={(e) => deleteCmt(e, item)} className={userInfo?._id === item.byUser ? "icon-delete" : "hidden"} />
                                <div onClick={() => showRepComment(item._id)} className="comments-icon" >
                                    <WechatOutlined style={{ color: "#e11b1e" }} /> <span>trả lời</span>

                                </div>
                                {repCmt.status === true && repCmt.key === item._id ? (
                                    <div className="comment-bottom">
                                        <form className="form" onSubmit={(e) => handleRepComment(e)}>
                                            <div className='user-comment'>
                                                <textarea
                                                    ref={textareaRef}
                                                    style={styles.textareaDefaultStyle}
                                                    onChange={textAreaChange}
                                                    value={repValue}
                                                    required
                                                    placeholder='bình luận góp ý nhé bạn'
                                                >
                                                    {repValue}
                                                </textarea>

                                            </div>
                                            <div className="submit1">
                                                <button type='submit'>Trả lời</button>
                                            </div>
                                        </form>
                                    </div>
                                ) : ""}

                                <div className="repcmts">
                                    <ul>
                                        {item.replies?.length > 0 ? (
                                            <RepCommentVideo
                                                allrepcomment={item.replies}
                                                // showRepComment={showRepComment}
                                                videoId={videoId}
                                                idComment={item._id}
                                            ></RepCommentVideo>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}
