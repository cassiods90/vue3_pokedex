<template>
    <div class="home-carousel d-flex justify-content-center align-items-center">
        <swiper
            :slides-per-view="1"
            :loop="true"
            :space-between="50"
            :breakpoints="breakpoints"
            :autoplay="autoplay"
            :navigation="navigation"
            :pagination="pagination"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <!-- Left Arrow Carousel Navigation -->
            <div class="carousel-navigation arrow-left">
                <SvgsIconLeft />
            </div>

            <!-- Carousel Items  -->
            <swiper-slide v-for="poke in pokesCarousel" :key="poke.id">
                <div class="home-carousel-item d-flex justify-content-center align-items-center">
                    <img :src="poke.pokeImage" alt="" />
                </div>
            </swiper-slide>

            <!-- Dots Central Carousel Pagination -->
            <div class="carousel-pagination carousel-dots"></div>

            <!-- Right Arrow Carousel Navigation -->
            <div class="carousel-navigation arrow-right">
                <SvgsIconRight />
            </div>
        </swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import images from '@/assets/image/images'

SwiperCore.use([Autoplay, Navigation, Pagination])

const breakpoints = {
    1: {
        slidesPerView: 1,
        spaceBetween: 15,
    },
    744: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
}

const autoplay = {
    delay: 5000,
}

const navigation = {
    prevEl: '.carousel-navigation.arrow-left',
    nextEl: '.carousel-navigation.arrow-right',
}

const pagination = {
    el: '.carousel-pagination',
    type: 'bullets',
    clickable: true,
}

const onSwiper = (swiper) => {
    // console.log(swiper)
}

const onSlideChange = () => {
    // console.log('slide change')
}

const pokesCarousel = Object.entries(images).map(([key, value], index) => ({
    id: index + 1,
    pokeImage: value,
}))
</script>
