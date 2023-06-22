<template>
    <div class="poke-infos-card poke-stats">
        <div
            class="poke-stats d-flex flex-column justify-content-start align-items-start"
            v-if="pokemon.types && pokemon.types.length > 0"
            :class="pokemon.types[0].name"
        >
            <span class="text pokemon-title bold" v-if="pokemon.types && pokemon.types.length > 0" :class="pokemon.types[0].name">Base Stats:</span>
            <div class="poke-stats-items d-flex flex-column justify-content-start align-items-start">
                <div class="poke-stats-item d-flex justify-content-start align-items-start" v-for="(stat, index) in pokemon.stats">
                    <span class="item-base-stat text black bold capitalize"> {{ stat.statsName }} </span>
                    <div class="stats-item-bar">
                        <div class="stats-item-bar-load" :style="`width: ${stat.statsPercentage}%;`"></div>
                    </div>
                    <span class="text black bold" :class="pokemon.types[0].name">{{ stat.statsValue }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { pokePageArray } from '@/stores/pokePage'

const pokePage = pokePageArray()
const pokemon = pokePage.pokeItem
</script>
