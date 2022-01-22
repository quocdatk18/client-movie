import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { LoginAcc } from '../../store/reducer/users/userSlice';
import VideoView from '../videoViews/VideoView';
import './Login.scss'
export default function Login() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch()
    const onSubmit = async (data, e) => {
        dispatch(LoginAcc(data))
        window.location.reload()
    };
    return (
        <div className='login'>
            <div className="login--div">
                <div className="login-left">
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="form-group">
                                <label htmlFor="">Tài Khoảng</label>
                                <div className="input">
                                    <input {...register("email")} type="text" placeholder='xin mời nhập tài khoảng' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Mật Khẩu</label>
                                <div className="input">
                                    <input  {...register("password")} type="password" placeholder='xin mời nhập mật khẩu' required />
                                </div>
                            </div>
                            <div className="form-group">


                                <div className="btn-register">
                                    <Link to='/register'>Chưa có tài khoảng ?</Link>
                                </div>
                                <div className="btn-login">
                                    <button>Đăng nhập</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="login-right">
                    <VideoView />
                </div>
            </div>

        </div>
    )
}
