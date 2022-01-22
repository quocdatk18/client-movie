import { DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSelector } from "../../store/reducer/users/userSlice";
import { deleteRepComment, getVideobyId } from "../../store/reducer/video/videoSlice";
import './RepCommentVideo.scss';


export default function RepCommentVideo(props) {
    const { allrepcomment, videoId, idComment } = props;

    const userInfo = useSelector(userSelector)
    const dispatch = useDispatch()
    const deleterepCmt = async (e, item) => {
        e.preventDefault()
        const video_id = videoId._id
        await dispatch(deleteRepComment({ item, video_id, idComment }))
    }

    return (
        <li className='reply-list'>
            {allrepcomment?.map((item, index) => {
                return <div key={index} className="reply-list-item">
                    <div className="name">
                        <img src={item.avata} alt="" />
                    </div>
                    <div className="cmt">
                        <div className="cmt-user">
                            <span>{item.nameUser}</span>
                        </div>
                        <div className="cmt-user-content">
                            {item.content}
                            <DeleteOutlined onClick={(e) => deleterepCmt(e, item)} className={userInfo?._id === item.byUser ? "icon-delete" : "hidden"} />

                        </div>
                    </div>
                </div>
            })}
        </li>
    )
}
