<template>
    <div class="header-menu mobile d-flex d-md-none justify-content-center align-items-center">
        <div class="header-menu-icon d-flex d-md-none justify-content-center align-items-center" @click="menuToggle = !menuToggle">
            <SvgsIconMenu />
        </div>
        <div class="header-menu-nav" :class="{ showHide: menuToggle }" @click="menuToggle = !menuToggle">
            <nuxtLink class="header-menu-item text text-header" to="/"> Home </nuxtLink>
            <nuxtLink class="header-menu-item text text-header" to="/pokesearch"> Poke Search </nuxtLink>
            <nuxtLink class="header-menu-item text text-header" to="/minigame"> Mini Game </nuxtLink>
            <nuxtLink class="header-menu-item text text-header" to="/about"> About Project </nuxtLink>
        </div>
    </div>
</template>

<script setup>
const menuToggle = ref(false)
</script>
