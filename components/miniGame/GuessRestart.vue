<template>
    <div class="guess-restart d-flex flex-column flex-xl-row justify-content-around align-items-center">
        <div class="slider-range">
            <div class="slider-cont">
                <span class="text white">Pokes Range: {{ sliderMin }} - {{ sliderMax }}</span>
                <MiniGameGuessCustomMinMaxSlider :max="891" v-model:min-value="sliderMin" v-model:max-value="sliderMax" />
            </div>
        </div>

        <button @click="newSort">
            <span class="text white">New Poke</span>
        </button>
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeGame = pokeGameSorted()

const sliderMin = ref(1)
const sliderMax = ref(891)

function newSort() {
    pokeGame.sortPoke()
}
</script>
