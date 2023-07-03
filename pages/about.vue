<template>
    <div class="pages about-page">
        <div class="container">
            <span class="text bigtitle white">About Page</span>
            <div class="about-content d-flex flex-column justify-content-center align-items-center">
                <span class="text white">
                    Hi All, The "Pokedex Project" is a project developed by me, Cassio Spessatto, with a focus on the most modern front-end
                    development technologies. Using these advanced tools, the application offers a fun and interactive experience for users, allowing
                    them to explore and discover information about Pokémon. With Vue 3 as the main JavaScript framework, Nuxt 3 as the development
                    framework, Pinia as the state management solution, Sass for advanced styling, and Swiper Carousel for creating interactive image
                    carousels, the "Pokedex Project" stands out as an example of a modern application developed with cutting-edge technologies.
                </span>

                <div class="link-icons d-flex justify-content-center align-items-center">
                    <a href="https://www.linkedin.com/in/cassiopossamaispessatto/" target="_blank">
                        <SvgsIconLinkedin />
                    </a>
                    <a href="https://github.com/cassiods90" target="_blank">
                        <SvgsIconGithub />
                    </a>
                    <a href="https://cassiospessatto.netlify.app/home" target="_blank">
                        <SvgsIconPersonal />
                    </a>
                </div>

                <div class="presentation-img">
                    <img src="@/assets/image/poke_initial.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>
