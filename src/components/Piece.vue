<template>
  <div id="piece" :style="styleObject" />
</template>

<script setup>
import { NUM_SIZES } from "src/store/game-state/constants";

name = "Piece";

const props = defineProps({
  owner: { type: Number, required: true },
  size: { type: Number, required: true },
});

const size = (props.size * 100) / NUM_SIZES;
console.log("size", props.size, size);
const styleObject = {
  width: size + "%",
  height: size + "%",
  borderColor: props.owner === 0 ? "blue" : "red",
};
</script>

<style scoped lang="sass">
#piece
  //Circle that fills the area
  border-radius: 50%
  border: solid 10px
  position: absolute
  display: inline
  width: 100%
  height: 100%
  margin: auto
  left: 0
  right: 0
  top: 0
  bottom: 0
</style>
