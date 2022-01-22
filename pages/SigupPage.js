import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Register from '../components/account/Register'
import Footer from '../components/footer/Footer'
import HeaderAll from '../components/header/HeaderAll'
import { userSelector } from '../store/reducer/users/userSlice'

export default function SigupPage() {
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
            <Register />
            <Footer />
        </div>
    )
}
