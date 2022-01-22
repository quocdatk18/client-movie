import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeaderAll from '../components/header/HeaderAll'
import Login from '../components/account/Login'
import { userSelector } from '../store/reducer/users/userSlice'
import Footer from '../components/footer/Footer'


export default function LoginPage() {
    const navigate = useNavigate()
    const user = useSelector(userSelector)


    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])
    return (
        <div>
            <HeaderAll />
            <Login />
            <Footer />
        </div>
    )
}
