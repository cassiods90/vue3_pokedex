<template>
    <div class="guess-input d-flex justify-content-center align-items-center">
        <span class="text minigame-gotcha" v-if="pokeGame.correctName">Gotcha !!!<br />The poke name is {{ pokeItem.pokeName }} !!!</span>
        <input placeholder="Type a pokemon name ..." @keyup="pokeTry" v-else />
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeGame = pokeGameSorted()
const pokeItem = pokeGame.pokemonRandom

function pokeTry(event) {
    const value = event.target.value.toLowerCase()
    pokeGame.pokeTryCompare(value)
}
</script>
