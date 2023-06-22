<template>
    <div class="poke-infos-card poke-details">
        <div class="poke-details-inner">
            <div class="poke-about d-flex flex-column justify-content-start align-items-start">
                <span class="text pokemon-title bold" v-if="pokemon.types && pokemon.types.length > 0" :class="pokemon.types[0].name">About: </span>
                <span class="text black"> {{ pokemon.text }}</span>
            </div>
            <div class="poke-details-data">
                <span class="text pokemon-title bold" v-if="pokemon.types && pokemon.types.length > 0" :class="pokemon.types[0].name">Details:</span>
                <div class="poke-data-content d-flex flex-column justify-content-start align-items-start">
                    <div class="poke-data-content-item d-flex justify-content-start align-items-start">
                        <span class="text black bold">Growth Rate:</span>
                        <span class="text black"> {{ pokemon.growth_rate }}</span>
                    </div>
                    <div class="poke-data-content-item d-flex justify-content-start align-items-start">
                        <span class="text black bold">Habitat:</span>
                        <span class="text black"> {{ pokemon.habitat }}</span>
                    </div>
                    <div class="poke-data-content-item d-flex justify-content-start align-items-start">
                        <span class="text black bold">Height:</span>
                        <span class="text black"> {{ pokemon.height }} Cm</span>
                    </div>
                    <div class="poke-data-content-item d-flex justify-content-start align-items-start">
                        <span class="text black bold">Weight</span>
                        <span class="text black"> {{ pokemon.weight }} Kg</span>
                    </div>

                    <div class="poke-data-content-item poke-damage-relation double-from d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">Double Damage From:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.double_damage_from.length > 0"
                                v-for="(double_from, index) in pokemon.damage_relation?.double_damage_from || []"
                                :key="index"
                                :src="badges[double_from]"
                            />
                            <span v-else>Double Damage From Anyone Type</span>
                        </div>
                    </div>

                    <div class="poke-damage-relation double-to d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">Double Damage To:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.double_damage_to.length > 0"
                                v-for="(double_to, index) in pokemon.damage_relation?.double_damage_to || []"
                                :key="index"
                                :src="badges[double_to]"
                            />
                            <span v-else>Double Damage To Anyone Type</span>
                        </div>
                    </div>
                    <div class="poke-damage-relation half-from d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">Half Damage From:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.half_damage_from.length > 0"
                                v-for="(half_from, index) in pokemon.damage_relation?.half_damage_from || []"
                                :key="index"
                                :src="badges[half_from]"
                            />
                            <span v-else>Half Damage From Anyone Type</span>
                        </div>
                    </div>
                    <div class="poke-damage-relation half-to d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">Half Damage To:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.half_damage_to.length > 0"
                                v-for="(half_to, index) in pokemon.damage_relation?.half_damage_to || []"
                                :key="index"
                                :src="badges[half_to]"
                            />
                            <span v-else>Half Damage To Anyone Type</span>
                        </div>
                    </div>
                    <div class="poke-damage-relation no-damage-from d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">No Damage From:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.no_damage_from.length > 0"
                                v-for="(no_from, index) in pokemon.damage_relation?.no_damage_from || []"
                                :key="index"
                                :src="badges[no_from]"
                            />
                            <span v-else>No Damage From Anyone Type</span>
                        </div>
                    </div>
                    <div class="poke-damage-relation no-damage-to d-flex flex-column justify-content-start align-items-start">
                        <span class="text black bold">No Damage To:</span>
                        <div class="poke-types d-flex flex-wrap justify-content-start align-items-start">
                            <img
                                class="poke-type"
                                v-if="pokemon.damage_relation && pokemon.damage_relation.no_damage_to.length > 0"
                                v-for="(no_to, index) in pokemon.damage_relation?.no_damage_to || []"
                                :key="index"
                                :src="badges[no_to]"
                            />
                            <span v-else>No Damage To Anyone Type</span>
                        </div>
                    </div>
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
