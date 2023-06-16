import { defineStore } from 'pinia'

// 'https://pokeapi.co/api/v2',
// 'https://pokeapi.co/api/v2/pokemon?limit=151' //-- First 150 Pokes
// 'https://pokeapi.co/api/v2/pokemon?limit=891'   // -- All 891 Pokes

export const usePokemonsStore = defineStore({
    id: 'pokemons',
    state: () => ({
        pokemons: [],
        loading: false,
    }),
    actions: {
        async morePokemons() {
            this.$state.loading = true

            const responseArray = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            const responseJson = await responseArray.json()

            console.log('responseArray')

            const pokemonsMap = responseJson.results.map(async (item) => {
                const responseItem = await fetch(item.url)
                const info = await responseItem.json()
                info.stats.forEach((stat) => {
                    stat['percent_base'] = (100 * stat.base_stat) / 200
                })
                return {
                    item,
                    info,
                }
            })
            const pokemons = await Promise.all(pokemonsMap)
            this.$state.loading = false
            this.$state.pokemons = [...pokemons, ...this.$state.pokemons]
        },
    },
    getters: {
        getPokemons(state) {
            return state.pokemons
        },
        isLoading(state) {
            return state.loading
        },
    },
})
