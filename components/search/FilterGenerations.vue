<template>
    <div class="filter-generations">
        <div class="gen-items d-flex flex-wrap justify-content-center align-items-center">
            <div
                class="gen-item d-flex flex-column justify-content-center align-items-center"
                v-for="(gen, index) in generations.generation"
                :key="index"
                @click="ChangeGen($event, gen.name)"
            >
                <span class="text text-filter">{{ gen.name }}</span>
                <img :src="gen.img" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { pokesArray } from '@/stores/pokemons'
import generations from '@/assets/image/generations/generationsImg'

const pokemons = pokesArray()

function ChangeGen(event, value) {
    const genItem = event.currentTarget.closest('.gen-item')

    const genItems = document.querySelectorAll('.gen-item')
    genItems.forEach((item) => {
        item.classList.remove('active')
    })
    genItem.classList.add('active')

    pokemons.getPokemons(value)
}
</script>
