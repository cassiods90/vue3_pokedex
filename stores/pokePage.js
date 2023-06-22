import { defineStore } from 'pinia'
import axios from 'axios'

export const pokePageArray = defineStore('pokeItem', {
    state: () => ({
        pokemon: [],
        loading: false,
    }),

    actions: {
        async getPoke(id) {
            try {
                this.loading = true
                this.pokemon = null

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const pokeData = response.data
                const pokeNumber = String(pokeData.id).padStart(3, '0')
                const height = pokeData.height * 10
                const weight = pokeData.weight / 10
                const types = pokeData.types.map((type) => ({
                    name: type.type.name,
                    url: type.type.url,
                }))

                let damage_relation = {
                    double_damage_from: [],
                    double_damage_to: [],
                    half_damage_from: [],
                    half_damage_to: [],
                    no_damage_from: [],
                    no_damage_to: [],
                }

                const addToDamageRelation = (arr, damageTypes) => {
                    damageTypes.forEach((type) => {
                        if (!arr.includes(type.name)) {
                            arr.push(type.name)
                        }
                    })
                }

                types.map(async (type) => {
                    const typeResponse = await axios.get(type.url)
                    const typeData = typeResponse.data.damage_relations

                    addToDamageRelation(damage_relation.double_damage_from, typeData.double_damage_from)
                    addToDamageRelation(damage_relation.double_damage_to, typeData.double_damage_to)
                    addToDamageRelation(damage_relation.half_damage_from, typeData.half_damage_from)
                    addToDamageRelation(damage_relation.half_damage_to, typeData.half_damage_to)
                    addToDamageRelation(damage_relation.no_damage_from, typeData.no_damage_from)
                    addToDamageRelation(damage_relation.no_damage_to, typeData.no_damage_to)
                })

                var pokeStatus = []
                pokeData.stats.forEach((stat) => {
                    const statRecalc = (stat['percent_base'] = (100 * stat.base_stat) / 200)
                    pokeStatus.push({
                        statsName: stat.stat.name,
                        statsValue: stat.base_stat,
                        statsPercentage: statRecalc,
                    })
                })

                const responseUniqueSpecies = await axios.get(`${pokeData.species.url}`)
                const pokeDataUnique = responseUniqueSpecies.data

                const text = pokeDataUnique.flavor_text_entries[0].flavor_text.replace(/[^\w\s]|[\n\f]/gi, ' ')

                const responseEvolutionChain = await axios.get(`${pokeDataUnique.evolution_chain.url}`)
                const evolutionChain = responseEvolutionChain.data

                const chain = []
                let currentPokemon = evolutionChain.chain

                // while (currentPokemon) {
                //     const { species, evolves_to } = currentPokemon
                //     const pokemonName = species.name
                //     const evolutionDetails = currentPokemon.evolution_details
                //     const level = evolutionDetails.length > 0 ? evolutionDetails[0].min_level : null

                //     const responseImg = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                //     const pokeimgData = responseImg.data

                //     const imageUrl = pokeimgData.sprites.other['official-artwork'].front_default

                //     chain.push({
                //         name: pokemonName,
                //         level: level,
                //         imageUrl: imageUrl,
                //     })

                //     if (evolves_to.length > 1) {
                //         const firstEvolution = evolves_to[0]
                //         currentPokemon = firstEvolution
                //     } else if (evolves_to.length === 1) {
                //         currentPokemon = evolves_to[0]
                //     } else {
                //         currentPokemon = null
                //     }
                // }
                while (currentPokemon) {
                    const { species, evolves_to } = currentPokemon
                    const pokemonName = species.name
                    const evolutionDetails = currentPokemon.evolution_details
                    const level = evolutionDetails.length > 0 ? evolutionDetails[0].min_level : null

                    const responseImg = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                    const pokeimgData = responseImg.data

                    const imageUrl = pokeimgData.sprites.other['official-artwork'].front_default
                    const currentEvolution = {
                        name: pokemonName,
                        pokeNumber: String(pokeimgData.id).padStart(3, '0'),
                        id: pokeimgData.id,
                        level: level,
                        imageUrl: imageUrl,
                        nextEvolutions: [],
                    }

                    const nextEvolutions = []

                    for (const evolution of evolves_to) {
                        const { species, evolution_details } = evolution
                        const nextPokemonName = species.name
                        const nextEvolutionDetails = evolution_details
                        const nextLevel = nextEvolutionDetails.length > 0 ? nextEvolutionDetails[0].min_level : null

                        const responseNextImg = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextPokemonName}`)
                        const nextPokeimgData = responseNextImg.data

                        const nextImageUrl = nextPokeimgData.sprites.other['official-artwork'].front_default
                        const nextEvolution = {
                            name: nextPokemonName,
                            pokeNumber: String(nextPokeimgData.id).padStart(3, '0'),
                            id: nextPokeimgData.id,
                            level: nextLevel,
                            imageUrl: nextImageUrl,
                        }

                        nextEvolutions.push(nextEvolution)
                    }

                    currentEvolution.nextEvolutions = nextEvolutions

                    chain.push(currentEvolution)

                    if (evolves_to.length > 0) {
                        currentPokemon = evolves_to[0]
                    } else {
                        currentPokemon = null
                    }
                }

                this.pokemon = {
                    pokeId: pokeData.id,
                    name: pokeData.name,
                    number: pokeNumber,
                    image: pokeData.sprites.other['official-artwork'].front_default,
                    types: types,
                    stats: pokeStatus,
                    height: height,
                    weight: weight,
                    text: text,
                    growth_rate: pokeDataUnique.growth_rate.name,
                    habitat: pokeDataUnique.habitat.name,
                    damage_relation: damage_relation,
                    evolution: chain,
                }

                console.log('pokemon => ', this.pokemon)
                this.loading = false
            } catch (error) {
                console.log(`error => ${error}`)
            }
        },
    },

    getters: {
        pokeItem(state) {
            return state.pokemon
        },
        isLoading(state) {
            return state.loading
        },
    },
})
