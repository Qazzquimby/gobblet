<template>
<div>
  {{owner}}
</div>
</template>

<script setup>
name="Piece"

const props = defineProps( {
  owner: {type: Number, required: true}
})
</script>

<style scoped>

</style>
