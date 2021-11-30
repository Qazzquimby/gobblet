<template>
  <q-layout style="width: 90%; margin: 0 auto">
    <h4 class="text-center">Current Player: {{ store.currentPlayer }}</h4>
    <reserve :owner="0" @click="clickSpace($event)" />
    <div class="board" style="height: 100%; width: 100%">
      <div v-for="row_i in NUM_ROWS" :key="row_i" class="row">
        <board-space
          v-for="col_i in NUM_COLS"
          :key="col_i"
          :row="row_i - 1"
          :col="col_i - 1"
          @click="
            clickSpace({
              area: 'board',
              coords: { row: row_i - 1, col: col_i - 1 },
            })
          "
        />
      </div>
    </div>
    <reserve :owner="1" @click="clickSpace($event)" />
  </q-layout>
</template>

<script setup lang="ts">
import { useGameStateStore } from 'src/stores/gameState';
import { Loc, NUM_ROWS, NUM_COLS } from 'components/models';
import _ from 'lodash';
import Reserve from 'components/Reserve.vue';
import BoardSpace from 'components/BoardSpace.vue';

const store = useGameStateStore();

const selectSpace = (clickedSpace: Loc) => {
  const largestPiece = store.getLargestPiece(clickedSpace);
  if (largestPiece && largestPiece.owner === store.currentPlayer) {
    store.selectedSpace = clickedSpace;
  }
};

const unselectSpace = () => {
  store.selectedSpace = undefined;
};

const canMoveToSpace = (clickedSpace: Loc) => {
  if (!store.selectedSpace) return false;
  const selectedPiece = store.getLargestPiece(store.selectedSpace);
  if (!selectedPiece) return false;

  const largestPieceOnClickedSpace = store.getLargestPiece(clickedSpace);
  return (
    clickedSpace.area === 'board' &&
    (!largestPieceOnClickedSpace ||
      selectedPiece.size > largestPieceOnClickedSpace.size)
  );
};

const moveToSpace = (clickedSpace: Loc) => {
  if (!store.selectedSpace) {
    throw new Error('No space selected when trying to move');
  }

  const selectedPiece = store.getLargestPiece(store.selectedSpace);
  if (!selectedPiece) {
    throw new Error('No piece in selected space when trying to move');
  }

  store.movePiece({
    start: store.selectedSpace,
    dest: clickedSpace,
    size: selectedPiece.size,
  });
  unselectSpace();
  store.currentPlayer = (store.currentPlayer + 1) % 2;
};

const clickSpace = (clickedSpace: Loc) => {
  if (!store.selectedSpace) {
    selectSpace(clickedSpace);
  } else if (_.isEqual(store.selectedSpace, clickedSpace)) {
    unselectSpace();
  } else {
    if (canMoveToSpace(clickedSpace)) {
      moveToSpace(clickedSpace);
    }
  }
};
</script>
