<template>
    <div class="results-list">
        <div class="pokemon-list d-flex flex-wrap justify-content-center align-items-center">
            <NuxtLink
                class="pokemon-card d-flex justify-content-start align-items-center"
                v-for="(poke, index) in pokemons.pokesList"
                :class="`background${poke.types[0]}`"
                :key="`pokemon-${poke.name}`"
                :to="`/search/${poke.pokeId}`"
            >
                <div class="card-content d-flex flex-column justify-content-start align-items-start">
                    <!-- <SvgsIconDots /> -->
                    <span class="text poke-id">#{{ poke.number }}</span>
                    <span class="text poke-name">{{ poke.name }}</span>
                    <div class="poke-types d-flex justify-content-start align-items-start">
                        <img class="poke-type" v-for="(type, index) in poke.types" :key="index" :src="badges[type]" />
                    </div>
                </div>
                <div class="card-image">
                    <img :src="poke.image" :alt="poke.name" />
                </div>
                <SvgsIconPokeball class="icon-pokeball" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { pokesArray } from '@/stores/pokemons'
import badges from '@/assets/badges/badges'
const pokemons = pokesArray()

onMounted(() => {
    const genItems = document.querySelector('.gen-item:first-child')
    genItems.classList.add('active')
    pokemons.getPokemons('firstGen')
})
</script>
