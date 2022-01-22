import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterAcc } from '../../store/reducer/users/userSlice';
import VideoView from '../videoViews/VideoView';
import './Login.scss';
export default function Register() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const onSubmit = async (data, e) => {
        if (password === confirmPassword) {
            dispatch(RegisterAcc(data))
            window.location.reload()
        } else {
            alert("mật khẩu không trùng khớp")
        }
    };
    return (
        <div className='login'>
            <div className="login--div">
                <div className="login-left">
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="form-group">
                                <label htmlFor="">Tên</label>
                                <div className="input">
                                    <input {...register("name")} type="text" placeholder='xin mời nhập tên' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Tài Khoảng</label>
                                <div className="input">
                                    <input {...register("email")} type="text" placeholder='xin mời nhập email' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Mật Khẩu</label>
                                <div className="input">
                                    <input  {...register("password")} type="password" placeholder='xin mời nhập mật khẩu' required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""> Nhập lại Mật Khẩu</label>
                                <div className="input">
                                    <input

                                        {...register("comfirmpassword")}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password" placeholder='xin mời lại nhập mật khẩu' required />
                                </div>
                            </div>
                            <div className="form-group">


                                <div className="btn-register">
                                    <Link to='/login'>Đã có tài khoảng ?</Link>
                                </div>
                                <div className="btn-login">
                                    <button>Đăng kí</button>
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
