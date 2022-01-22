import React from 'react'
import Footer from '../components/footer/Footer'
import HeaderAll from '../components/header/HeaderAll'
import ShowVideoNew from '../components/showVideoNew/ShowVideoNew'
import Carousel from '../components/slider/Carosile'

export default function HomePage() {
    return (
        <div>
            <HeaderAll />
            <Carousel />
            <ShowVideoNew />
            <Footer />
        </div>
    )
}
