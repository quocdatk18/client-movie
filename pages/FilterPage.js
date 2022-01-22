import React from 'react'
import FilterVideo from '../components/filterVideo/FilterVideo'
import Footer from '../components/footer/Footer'
import HeaderAll from '../components/header/HeaderAll'
import ShowVideoFilter from '../components/showVideoFilter/ShowVideoFilter'

export default function FilterPage() {
    return (
        <div>
            <HeaderAll />
            <FilterVideo />
            <ShowVideoFilter />
            <Footer />
        </div>
    )
}
