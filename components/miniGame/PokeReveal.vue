<template>
    <div class="poke-reveal">
        <div class="poke-reveal-inner">
            <MiniGameRevealImage />
            <MiniGameRevealName />
        </div>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeRandom = pokeGameSorted()
</script>
