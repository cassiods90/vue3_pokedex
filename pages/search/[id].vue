<template>
    <div class="pages poke-page">
        <div class="container-fluid">
            <PokemonPokeData v-if="pokePage.pokeItem" />
            <div class="row">
                <div class="col-12 col-xl-4">
                    <div class="poke-column">
                        <!-- <PokemonPokeball /> -->
                        <PokemonPokeDetails v-if="pokePage.pokeItem" />
                    </div>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="poke-column">
                        <!-- <PokemonPokeball /> -->
                        <PokemonPokeStats v-if="pokePage.pokeItem" />
                    </div>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="poke-column">
                        <!-- <PokemonPokeball /> -->
                        <PokemonPokeEvolution v-if="pokePage.pokeItem" />
                    </div>
                </div>
            </div>
        </div>

        <AppLoader v-if="pokePage.isLoading" />
    </div>
</template>

<script setup>
import { pokePageArray } from '@/stores/pokePage'
const pokePage = pokePageArray()

function setBackgroundColor() {
    const body = document.querySelector('body')
    body.classList.add(`poke-back-${pokePage.pokeItem.types[0].name}`)
}

onMounted(() => {
    const route = useRoute()

    const pageId = route.params.id

    pokePage
        .getPoke(pageId)
        .then(() => {
            setBackgroundColor()
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })
})

onBeforeUnmount(() => {
    const body = document.querySelector('body')
    body.classList.remove(`poke-back-${pokePage.pokeItem.types[0].name}`)
    pokePage.pokemon = null
})
</script>
