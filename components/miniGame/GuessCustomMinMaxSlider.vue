<template>
    <div ref="slider" class="custom-slider minmax">
        <input ref="inputMin" type="range" name="min" id="min" :min="min" :max="max" :value="pokeGame.minValue" :step="step" @input="onInput" />
        <input ref="inputMax" type="range" name="max" id="max" :min="min" :max="max" :value="pokeGame.maxValue" :step="step" @input="onInput" />
    </div>
</template>

<script setup>
import { pokeGameSorted } from '@/stores/pokeGame'

const pokeGame = pokeGameSorted()

const { min, max, step, minValue, maxValue } = defineProps({
    min: {
        type: Number,
        default: 1,
    },
    max: {
        type: Number,
        default: 100,
    },
    step: {
        type: Number,
        default: 1,
    },
    minValue: {
        type: Number,
        default: 50,
    },
    maxValue: {
        type: Number,
        default: 80,
    },
})

const slider = ref(null)
const inputMin = ref(null)
const inputMax = ref(null)
const sliderMinValue = ref(pokeGame.minValue)
const sliderMaxValue = ref(pokeGame.maxValue)

const emit = defineEmits(['update:minValue', 'update:maxValue'])

const getPercent = (value, min, max) => {
    return ((value - min) / (max - min)) * 100
}

const sliderDifference = computed(() => {
    return Math.abs(sliderMaxValue.value - sliderMinValue.value)
})

const setCSSProps = (width, left, right) => {
    slider.value.style.setProperty('--width', `${width}%`)
    slider.value.style.setProperty('--progressLeft', `${left}%`)
    slider.value.style.setProperty('--progressRight', `${right}%`)
}

watchEffect(() => {
    if (slider.value) {
        emit('update:minValue', sliderMinValue.value)
        emit('update:maxValue', sliderMaxValue.value)

        const differencePercent = getPercent(sliderDifference.value, min, max)
        const leftPercent = getPercent(sliderMinValue.value, min, max)
        const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max)

        setCSSProps(differencePercent, leftPercent, rightPercent)
    }
})

const onInput = ({ target }) => {
    inputMin.value.style.setProperty('z-index', target.name === 'min' ? 1 : 0)
    inputMax.value.style.setProperty('z-index', target.name === 'max' ? 1 : 0)

    if (target.name === 'min') {
        target.value > sliderMaxValue.value ? (target.value = sliderMaxValue.value) : (sliderMinValue.value = parseFloat(target.value))
        // inputMin.value.value = sliderMinValue.value
        pokeGame.minValue = sliderMinValue.value
    }

    if (target.name === 'max') {
        target.value < sliderMinValue.value ? (target.value = sliderMinValue.value) : (sliderMaxValue.value = parseFloat(target.value))
        // inputMax.value.value = sliderMaxValue.value
        pokeGame.maxValue = sliderMaxValue.value
    }
}
</script>
