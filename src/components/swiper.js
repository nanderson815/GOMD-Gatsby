import React from 'react';
import Swiper from 'react-id-swiper';
import Img from 'gatsby-image';
import 'swiper/css/swiper.css'

const photoSwiper = ({ photos }) => {
    const params = {
        spaceBetween: 30,
        effect: 'fade',
        centeredSlides: true,
        autoplay: {
            delay: 15000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }
    let slidePhotos = photos.slice().reverse();
    let slides = slidePhotos.map((pic, index) => {
        return (
            <Img key={index} style={{ maxHeight: "475px" }} fluid={pic.childImageSharp.fluid} />
        )
    })

    return (
        <Swiper {...params} style={{ margin: "-10px" }}>
            {slides}
        </Swiper>
    )
};
export default photoSwiper;