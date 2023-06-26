<template>
    <div class="filter-search">
        <input placeholder="Type a pokemon name ..." @keyup="searchPoke" />
        <SvgsIconSearch />
    </div>
</template>

<script setup>
import { pokesArray } from '@/stores/pokemons'

const pokemons = pokesArray()

function searchPoke(event) {
    const value = event.target.value.toLowerCase()
    pokemons.filterSearch(value)
}
</script>
