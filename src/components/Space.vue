<template>
  <q-responsive
    :ratio="1"
    class="space-wrapper col"
    :style="{ background: isSelected ? 'grey' : '' }"
  >
    <span v-for="(owner, size) in pieces" :key="size">
      <span v-if="owner !== undefined">
        <Piece :owner="owner" :size="size" />
      </span>
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
  row: { type: Number, required: true },
  col: { type: Number, required: true },
});

const isSelected = computed(() => {
  return _.isEqual(store.state.gameState.selectedSpace, {
    row: props.row,
    col: props.col,
  });
});
const pieces = store.state.gameState.board[props.row][props.col];
</script>

<style scoped lang="sass">
.space-wrapper
  border-radius: 10%
  border: dashed black
  margin: 2px
</style>
