<template>
  <q-page>
    <q-layout style="width: 90%; margin: 0 auto">
      <h4 class="text-center">Current Player: {{ currentPlayer }}</h4>
      <Reserve :player="0" />
      <div class="board" style="height: 100%; width: 100%">
        <div v-for="row_i in NUM_ROWS_COLS" :key="row_i" class="row">
          <Space
            v-for="col_i in NUM_ROWS_COLS"
            :key="col_i"
            :row="row_i - 1"
            :col="col_i - 1"
            @click="clickSpace({ row: row_i - 1, col: col_i - 1 })"
          />
        </div>
      </div>
      <Reserve :player="1" />
    </q-layout>
  </q-page>
</template>

<script setup>
import Space from "components/Space";
import _ from "lodash";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const { NUM_ROWS_COLS } = require("src/store/game-state/constants");

const currentPlayer = computed(() => store.state.gameState.currentPlayer);

const getLargestPiece = (space) => {
  return store.getters["gameState/getLargestPiece"](space);
};

const selectedSpace = computed(() => store.state.gameState.selectedSpace);

const selectSpace = (clickedSpace) => {
  const largestPiece = getLargestPiece(clickedSpace);
  if (
    largestPiece !== undefined &&
    largestPiece.owner === currentPlayer.value
  ) {
    store.commit("gameState/setSelectedSpace", clickedSpace);
  }
};

const unselectSpace = () => {
  store.commit("gameState/setSelectedSpace", undefined);
};

const canMoveToSpace = (clickedSpace) => {
  const selectedPiece = getLargestPiece(selectedSpace.value);
  const largestPieceOnClickedSpace = getLargestPiece(clickedSpace);

  return (
    largestPieceOnClickedSpace === undefined ||
    selectedPiece.size > largestPieceOnClickedSpace.size
  );
};

const moveToSpace = (clickedSpace) => {
  store.dispatch("gameState/movePiece", {
    start: selectedSpace.value,
    dest: clickedSpace,
    size: getLargestPiece(selectedSpace.value).size,
  });
  unselectSpace();
  store.commit("gameState/setCurrentPlayer", (currentPlayer.value + 1) % 2);
};

const clickSpace = (clickedSpace) => {
  console.log("old selected ", selectedSpace.value);
  console.log("clicked ", clickedSpace);

  if (selectedSpace.value === undefined) {
    selectSpace(clickedSpace);
  } else if (_.isEqual(selectedSpace.value, clickedSpace)) {
    unselectSpace();
  } else {
    if (canMoveToSpace(clickedSpace)) {
      moveToSpace(clickedSpace);
    }
  }
  console.log("selected", selectedSpace.value);
};
</script>
