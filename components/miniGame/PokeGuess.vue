<template>
    <div class="poke-guess">
        <div class="poke-guess-inner d-flex flex-column justify-content-center align-items-center">
            <MiniGameGuessInput />
            <MiniGameGuessScoreboard />
            <MiniGameGuessRestart />
        </div>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeGame = pokeGameSorted()
const pokeItem = pokeGame.pokemonRandom
</script>
