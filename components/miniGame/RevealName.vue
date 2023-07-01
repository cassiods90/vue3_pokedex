<template>
    <div class="poke-name">
        <span class="text text-score" @click="revealName">Click Here to Reveal the name of the Pokemon:</span>
        <span class="text text-revealName" v-if="isDropdownOpen">{{ pokeItem.pokeName }}</span>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeRandom = pokeGameSorted()
const pokeItem = pokeRandom.pokemonRandom

const isDropdownOpen = ref(false)

function revealName() {
    isDropdownOpen.value = !isDropdownOpen.value
    pokeRandom.setWithoutTip()
}
</script>
