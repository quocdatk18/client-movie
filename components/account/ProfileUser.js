import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, userSelector } from '../../store/reducer/users/userSlice';
import VideoView from '../videoViews/VideoView';
import './Login.scss';
export default function ProfileUser() {
    const userInfo = useSelector(userSelector)
    const {
        register,
        handleSubmit,
    } = useForm();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const onSubmit = async (data, e) => {
        if (password === confirmPassword) {
            let formData = new FormData();
            formData.append("image", image);
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password)
            formData.append("address", data.address);
            formData.append("phone", data.phone);
            ;
            await dispatch(updateProfile(formData));
            window.location.reload()
        } else {
            alert("mật khẩu không trùng khớp")
        }
    };
    const [image, setImage] = useState("");

    const handleFileImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    return (
        <div className='login'>
            <div className="login--div">
                <div className="login-left">
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="form-group">
                                <input
                                    type="file"
                                    {...register("image")}
                                    onChange={handleFileImageChange}
                                ></input>

                            </div>
                            <div className="form-group">
                                <label htmlFor="">Tên</label>
                                <div className="input">
                                    <input {...register("name")} type="text" value={userInfo?.name} placeholder='xin mời nhập tên' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Địa Chỉ</label>
                                <div className="input">
                                    <input {...register("address")} type="text" value={userInfo?.address} placeholder='xin mời nhập địa chỉ' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Số điện thoại</label>
                                <div className="input">
                                    <input {...register("phone")} type="text" value={userInfo?.phone} placeholder='xin mời nhập số điện thoại' required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Tài Khoảng</label>
                                <div className="input">
                                    <input {...register("email")} value={userInfo?.email} type="text" placeholder='xin mời nhập email' required />
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



                                <div className="btn-login">
                                    <button className='btn-update'>Đổi thông tin tài khoảng</button>
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
