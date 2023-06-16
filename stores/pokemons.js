import { defineStore } from 'pinia'
import axios from 'axios'

export const pokesArray = defineStore('poke', {
    state: () => ({
        pokemons: [],
        filteredPokemons: [],
        loading: false,
        apiUrl: '',
        filterValue: '',
    }),

    actions: {
        async getPokemons(generation) {
            if (generation == 'Generation 02') {
                this.apiUrl = '&offset=151&limit=100'
            } else if (generation == 'Generation 03') {
                this.apiUrl = '&offset=251&limit=135'
            } else if (generation == 'Generation 04') {
                this.apiUrl = '&offset=386&limit=107'
            } else if (generation == 'Generation 05') {
                this.apiUrl = '&offset=493&limit=156'
            } else if (generation == 'Generation 06') {
                this.apiUrl = '&offset=649&limit=72'
            } else if (generation == 'Generation 07') {
                this.apiUrl = '&offset=721&limit=88'
            } else if (generation == 'Generation 08') {
                this.apiUrl = '&offset=809&limit=81'
            } else if (generation == 'All Generations') {
                this.apiUrl = '&offset=0&limit=1500'
            } else {
                this.apiUrl = '&offset=0&limit=151'
            }
            try {
                this.loading = true
                this.pokemons = []
                this.filteredPokemons = []

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?${this.apiUrl}`)
                const pokemons = await Promise.all(
                    response.data.results.map(async (item) => {
                        const responseItem = await axios.get(item.url)
                        const info = responseItem.data
                        const types = info.types.map((type) => type.type.name)
                        const pokeNumber = String(info.id).padStart(3, '0')

                        return {
                            pokeId: info.id,
                            number: pokeNumber,
                            pokeUrl: item.url,
                            name: info.name,
                            image: info.sprites.other['official-artwork'].front_default,
                            types: types,
                        }
                    })
                )

                console.log('pokemons:', pokemons)
                this.loading = false
                this.pokemons = [...pokemons, ...this.pokemons] // Complete Array of Pokes
                // this.filteredPokemons = [...pokemons, ...this.pokemons] // Filtered Array of pokes
                this.filterSearch(this.filterValue)
            } catch (error) {
                console.log(`error => ${error}`)
            }
        },
        filterSearch(value) {
            this.filterValue = value
            this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.name.includes(this.filterValue))
        },
    },

    getters: {
        pokesList(state) {
            return state.filteredPokemons
        },
        isLoading(state) {
            return state.loading
        },
    },
})
