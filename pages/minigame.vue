<template>
    <div class="pages minigame-page">
        <h1 class="text minigame-title">Who's that <br />Pokemon ?</h1>

        <AppLoader v-if="pokeRandom.isLoading" />
        <div class="container" v-else>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="minigame-content d-flex justify-content-center align-items-center">
                        <MiniGamePokeReveal />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="minigame-content d-flex justify-content-center align-items-center">
                        <MiniGamePokeGuess />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeRandom = pokeGameSorted()

onMounted(() => {
    pokeRandom.sortPoke()
    console.log('pokeRandom: ', pokeRandom)
})
</script>
