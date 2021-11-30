<template>
  <q-responsive
    :ratio="1"
    class="space-wrapper col"
    :style="{ background: background }"
  >
    <span v-for="(owner, size) in pieces" :key="size">
      <span v-if="owner !== undefined">
        <piece :owner="owner" :size="size" />
      </span>
    </span>
  </q-responsive>
</template>

<script setup>
import Piece from 'components/Piece';
import { computed } from 'vue';
import _ from 'lodash';
import { useGameStateStore } from 'src/stores/gameState';

const store = useGameStateStore();

const props = defineProps({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
});

const isSelected = computed(() => {
  const selectedSpace = store.selectedSpace;
  return (
    selectedSpace !== undefined &&
    selectedSpace.area === 'board' &&
    _.isEqual(selectedSpace.coords, {
      row: props.row,
      col: props.col,
    })
  );
});

const isLegalMove = computed(() => {
  const legalMoves = store.legalMoves;
  const match = legalMoves.find(
    (legalMove) =>
      legalMove.area === 'board' &&
      _.isEqual(legalMove.coords, { row: props.row, col: props.col })
  );
  return match !== undefined;
});

const background = computed(() => {
  if (isSelected.value) {
    return 'grey';
  } else if (isLegalMove.value) {
    return 'yellow';
  } else {
    return '';
  }
});

const pieces = store.board[props.row][props.col];
</script>

<style scoped lang="sass">
.space-wrapper
  border-radius: 10%
  border: dashed black
  margin: 2px
</style>
