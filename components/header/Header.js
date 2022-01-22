import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../logo/logo.jpg';
import { Logout, userSelector } from '../../store/reducer/users/userSlice';
import { getAllVideo, searchVideo, videosSelector, videosSelectorSearch } from '../../store/reducer/video/videoSlice';
import './Header.scss';
export default function Header() {
    const video = useSelector(videosSelectorSearch)
    const [search, setSearch] = useState("");
    const userInfo = useSelector(userSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchVideo(search))
        dispatch(getAllVideo())
        // setSearch('')
    }, [search, dispatch])
    const [showAccount, setShowAccount] = useState(false);

    const dropDownRef = useRef(null)
    const handleClickOutSide = (e) => {
        if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {

            setShowAccount(false)
        }
    }
    useEffect(() => {
        window.document.addEventListener("mousedown", (e) => {
            handleClickOutSide(e)
        })
        return () => {
            window.document.removeEventListener("mousedown", (e) => {
                handleClickOutSide(e)
            })
        }
    }, [setShowAccount])
    const handleSignout = () => {
        dispatch(Logout())
        window.location.reload()
    };
    return (
        <div className="header">
            <div className="header__left">
                <Link to='/'>
                    <img src={logo} alt="" />
                    <div className="header__left-text">
                        <h3>AnimeBB.Com</h3>
                        <p>Xem anime chất lượng cao!</p>
                    </div>
                </Link>
            </div>
            <div className="header__center">
                <div className="header__center-search">
                    <SearchOutlined className="search-icon" />

                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm: tên anime ..." />
                </div>
                <div className={search === "" ? 'hidden' : "search-video"}>
                    <ul>
                        {video?.length > 0 ?
                            <div>
                                {video && video?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link onClick={() => setSearch('')} style={{ width: '100%', display: 'flex' }} to={'/video/' + item._id}>
                                                <div className="img">
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className="details">
                                                    <h1>{item.name}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </div> : <li>
                                <h1 style={{ fontSize: '15px', margin: 'auto' }}>Hiện chưa có phim này</h1>
                            </li>}

                    </ul>
                </div>
            </div>
            <div className="header__right">
                {!userInfo ?
                    <div>
                        <Link className="header__right-item" to="/register">
                            Đăng kí
                        </Link>
                        <Link className="header__right-item" to="/login">
                            Đăng nhập
                        </Link>
                        <Link className="header__right-item" to="">
                            Đăng nhập bằng Facebook
                        </Link>
                    </div> :
                    <div className='abouts'>
                        {userInfo.avata
                            ? <div className='abouts-avatar'>
                                <img src={userInfo.avata} alt="" />
                            </div>
                            : ""}

                        <div onClick={() => setShowAccount(!showAccount)} className="about-user">
                            <span className="about-user-name">

                                chào {userInfo.name}  <DownOutlined className="about-user-icon" style={{ fontSize: "14px" }} />
                            </span>

                            <div ref={dropDownRef} className={showAccount ? "list-user" : "hidden"} >
                                <div className="my-user">
                                    <Link to='/myvideo'>Tủ phim</Link>
                                    <Link to='/profile'>Thông tin tài khoản</Link>
                                    <Link to="#" onClick={handleSignout}>Đăng xuất</Link>

                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div >
    )
}
