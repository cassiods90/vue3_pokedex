<template>
    <div class="guess-scoreboard">
        <span class="text text-score">Your Score: {{ pokeGame.scoreCounter }}</span>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeGame = pokeGameSorted()
</script>
