import { defineStore } from 'pinia'
import axios from 'axios'

export const pokeGameSorted = defineStore('pokeGame', {
    state: () => ({
        randomPoke: [],
        loading: false,
        isCorrect: false,
        counter: 0,
        maxValue: 891,
        minValue: 0,
        withoutTip: true,
    }),

    actions: {
        async sortPoke() {
            try {
                this.loading = true
                this.isCorrect = false
                this.withoutTip = true
                this.randomPoke = []

                const maxValue = this.maxValue
                const minValue = this.minValue
                const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomValue}`)
                const pokeData = response.data

                const pokeNumber = String(pokeData.id).padStart(3, '0')
                const types = pokeData.types.map((type) => type.type.name)

                this.randomPoke = {
                    pokeId: pokeData.id,
                    pokeName: pokeData.name,
                    PokeNumber: pokeNumber,
                    PokeImage: pokeData.sprites.other['official-artwork'].front_default,
                    PokeTypes: types,
                }
                this.loading = false

                // console.log('Pokemon Sorted => ', this.randomPoke)
            } catch (error) {
                console.log(`error => ${error}`)
            }
        },
        pokeTryCompare(value) {
            if (value == this.randomPoke.pokeName) {
                if (this.withoutTip == true) {
                    this.counter++
                }
                this.isCorrect = true
                this.withoutTip = true
            }
        },
        setWithoutTip() {
            this.withoutTip = false
        },
    },

    getters: {
        pokemonRandom(state) {
            return state.randomPoke
        },
        scoreCounter(state) {
            return state.counter
        },
        correctName(state) {
            return state.isCorrect
        },
        isLoading(state) {
            return state.loading
        },
    },
})
