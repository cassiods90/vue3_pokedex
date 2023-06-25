<template>
    <div class="filter-types">
        <div class="filter-types-inner">
            <button class="filter-types-btn" @click.stop="isDropdownOpen = !isDropdownOpen">
                <span class="text white">Select a Type to filter</span>
                <SvgsIconDown v-if="!isDropdownOpen" />
                <SvgsIconUp v-else="isDropdownOpen" />
            </button>

            <ul v-if="isDropdownOpen" class="filter-types-menu d-flex flex-wrap justify-content-center align-items-center">
                <li>
                    <label class="d-flex justify-content-center align-items-center">
                        <input type="checkbox" class="checkbox-input select-all" :checked="isAllTypesSelected" @change="toggleSelectAll" />
                        <span class="text white">Select All</span>
                    </label>
                </li>
                <li>
                    <label class="d-flex justify-content-center align-items-center">
                        <input type="checkbox" class="checkbox-input remove-all" :checked="areNoneTypesSelected" @change="toggleRemoveAll" />
                        <span class="text white">Remove All</span>
                    </label>
                </li>
                <li v-for="(badge, key) in badges" :key="key">
                    <label class="d-flex justify-content-center align-items-center">
                        <input type="checkbox" class="checkbox-input" :value="key" v-model="selectedTypes" @change="updateTypeFilter" />
                        <img :src="badge" :alt="key" />
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import badges from '@/assets/badges/badges'
import { pokesArray } from '@/stores/pokemons'

const filterTypesApi = pokesArray()
const isDropdownOpen = ref(false)
const selectedTypes = ref([])
const isAllTypesSelected = computed(() => selectedTypes.value.length === Object.keys(badges).length)
const areNoneTypesSelected = computed(() => selectedTypes.value.length === 0)

function updateTypeFilter() {
    filterTypesApi.filterType(selectedTypes.value)
}

function toggleSelectAll() {
    setTimeout(() => {
        document.querySelector('.select-all').checked = true
    }, 100)

    selectedTypes.value = Object.keys(badges)
    updateTypeFilter()
}

function toggleRemoveAll() {
    setTimeout(() => {
        document.querySelector('.remove-all').checked = true
    }, 100)

    selectedTypes.value = []
    updateTypeFilter()
}

function clickOutside(event) {
    if (isDropdownOpen.value) {
        const dropdown = document.querySelector('.filter-types-menu')
        const target = event.target

        if (!dropdown.contains(target) && target !== dropdown && target.parentNode !== dropdown.parentNode) {
            isDropdownOpen.value = false
        }
    }
}

onMounted(() => {
    // toggleSelectAll()
    selectedTypes.value = Object.keys(badges)
    document.addEventListener('click', clickOutside)
})
</script>
