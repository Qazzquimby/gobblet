<template>
  <q-responsive
    :ratio="1"
    class="space-wrapper col"
    :style="{ background: isSelected ? 'grey' : '' }"
  >
    <span v-for="(_, size) in pieces.length" :key="size">
      <Piece :owner="owner" :size="size" />
    </span>
  </q-responsive>
</template>

<script setup>
import { useStore } from "vuex";
import Piece from "components/Piece";
import { computed } from "vue";
import _ from "lodash";

const store = useStore();

const props = defineProps({
  owner: { type: Number, required: true },
  id: { type: Number, required: true },
});

const isSelected = computed(() => {
  const selectedSpace = store.state.gameState.selectedSpace;
  return (
    selectedSpace !== undefined &&
    selectedSpace.area === "reserves" &&
    _.isEqual(selectedSpace.coords, {
      row: props.owner,
      col: props.id,
    })
  );
});

const pieces = store.state.gameState.reserves[props.owner][props.id];
console.log("pieces", pieces);
</script>

<style scoped lang="sass">
.space-wrapper
  border-radius: 10%
  border: dashed black
  margin: 2px
</style>
