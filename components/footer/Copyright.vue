<template>
    <span class="text small-text"> &copy; Developed by Cassio Spessatto - {{ currentYear }} </span>
</template>

<script setup>
const currentYear = new Date().getUTCFullYear()
</script>
