<template>
    <div class="pages poke-search-page">
        <SearchResultsFilter />
        <SearchResultsList />
        <AppLoader v-if="pokemons.isLoading" />
    </div>
</template>

<script setup>
import { pokesArray } from '@/stores/pokemons'

const pokemons = pokesArray()
</script>
