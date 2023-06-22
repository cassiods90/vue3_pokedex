<template>
    <div class="poke-infos-card poke-evolution">
        <div
            class="poke-evolution-inner d-flex flex-column justify-content-start align-items-start"
            v-if="pokemon.types && pokemon.types.length > 0"
            :class="pokemon.types[0].name"
        >
            <span class="text pokemon-title bold" v-if="pokemon.types && pokemon.types.length > 0" :class="pokemon.types[0].name"
                >Evolution Chain:</span
            >
            <div class="poke-evolution-items d-flex flex-column justify-content-start align-items-start">
                <span class="no-evolution text bold black" v-if="pokemon.evolution.length < 2">These Pokemon has no evolution</span>
                <div
                    class="poke-evolution-item d-flex flex-wrap justify-content-center align-items-center"
                    v-for="(evolution, index) in pokemon.evolution"
                    v-else
                >
                    <div
                        class="poke-evolution-item-inner d-flex justify-content-between align-items-center"
                        v-for="(nextEvolution, nextIndex) in evolution.nextEvolutions"
                        :key="nextIndex"
                    >
                        <NuxtLink
                            class="poke-item-current d-flex flex-column justify-content-center align-items-center"
                            :to="`/search/${evolution.id}`"
                        >
                            <div class="poke-evolution-image">
                                <img :key="index" :src="evolution.imageUrl" />
                            </div>
                            <span class="text black">#{{ evolution.pokeNumber }}</span>
                            <span class="text black bold capitalize">{{ evolution.name }}</span>
                        </NuxtLink>

                        <div class="poke-evolution-arrow d-flex flex-column justify-content-center align-items-center">
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="arrow-body"></div>
                                <div class="arrow"></div>
                            </div>
                            <span class="text black bold" v-if="nextEvolution.level">(Level: {{ nextEvolution.level }})</span>
                            <span class="text black bold" v-else>(Does not evolve by level)</span>
                        </div>

                        <NuxtLink
                            class="poke-item-evolution d-flex flex-column justify-content-center align-items-center"
                            :to="`/search/${nextEvolution.id}`"
                        >
                            <div class="poke-evolution-image">
                                <img :key="index" :src="nextEvolution.imageUrl" />
                            </div>
                            <span class="text black">#{{ nextEvolution.pokeNumber }}</span>
                            <span class="text black bold capitalize">{{ nextEvolution.name }}</span>
                        </NuxtLink>
                    </div>
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
