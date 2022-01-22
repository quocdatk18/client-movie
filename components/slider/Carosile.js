import React, { useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideo, videosSelector } from '../../store/reducer/video/videoSlice'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carousel(props) {

    const video = useSelector(videosSelector)
    const { videoMost } = video;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllVideo())
    }, [dispatch])
    const sliderRef = useRef();

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: <next />,
        prevArrow: <previous />,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };



    const next = () => {
        sliderRef?.current.slickNext();
    }
    const previous = () => {
        sliderRef?.current.slickPrev();
    }


    return (
        <div id="carousel">
            <div className="carousel">
                <div className="carousel-left-slide">

                    <Slider

                        ref={sliderRef}

                        {...settings}>
                        {videoMost?.map((item, index) => {
                            return (
                                <div className="cardImg" key={index}>
                                    <div className="img">
                                        <img src={item.image} alt="" />
                                        <h1>{item.name}</h1>
                                    </div>

                                </div>
                            )
                        })}
                    </Slider>



                </div >
                <div className="prev carousel-left-move" onClick={() => previous()}>
                    <LeftOutlined></LeftOutlined>
                </div>
                <div className="next carousel-left-move" onClick={() => next()}>
                    <RightOutlined></RightOutlined>
                </div>
            </div>
        </div>

    );
}

export default Carousel;
