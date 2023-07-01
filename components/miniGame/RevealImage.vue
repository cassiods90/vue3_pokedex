<template>
    <NuxtLink class="poke-image corretName" v-if="pokeRandom.correctName" :to="`/search/${pokeRandom.randomPoke.pokeId}`">
        <img class="poke-background" src="@/assets/image/minigame/imagem3.png" />
        <img class="poke-img" :src="pokeRandom.randomPoke.PokeImage" />
    </NuxtLink>
    <div class="poke-image" v-else>
        <img class="poke-background" src="@/assets/image/minigame/imagem3.png" />
        <img class="poke-img" :src="pokeRandom.randomPoke.PokeImage" />
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeRandom = pokeGameSorted()
</script>
