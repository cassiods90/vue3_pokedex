<template>
    <div class="poke-data">
        <span class="text pokemon-extra-title"> {{ pokemon.name }}</span>
        <div class="poke-data-inner d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">
            <div class="poke-img">
                <img :src="pokemon.image" :alt="pokemon.name" />
            </div>
            <div class="poke-content d-flex flex-column justify-content-center align-items-center align-items-md-start">
                <span class="text pokemon-number"># {{ pokemon.number }}</span>
                <span class="text pokemon-name">{{ pokemon.name }}</span>
                <div class="poke-types d-flex justify-content-start align-items-start">
                    <img class="poke-type" v-for="(type, index) in pokemon.types" :key="index" :src="badges[type.name]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import badges from '@/assets/badges/badges'
import { pokePageArray } from '@/stores/pokePage'

const pokePage = pokePageArray()
const pokemon = pokePage.pokeItem
</script>
