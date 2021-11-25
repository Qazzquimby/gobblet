<template>
  <q-page class="flex flex-center">
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
  </q-page>
</template>

<script setup>
import Space from "components/Space";
import _ from "lodash";
import { useStore } from "vuex";
import { getLargestPiece } from "src/store/game-state/getters";

const store = useStore();

const { NUM_ROWS_COLS } = require("src/store/game-state/constants");

let currentPlayer = 0;

const selectSpace = (clickedSpace) => {
  const largestPiece = store.getters["gameState/getLargestPiece"](clickedSpace);
  if (largestPiece !== undefined && largestPiece.owner === currentPlayer) {
    store.commit("gameState/setSelectedSpace", clickedSpace);
  }
};

const unselectSpace = () => {
  store.commit("gameState/setSelectedSpace", undefined);
};

const moveToSpace = (clickedSpace) => {
  store.dispatch("gameState/movePiece", {
    start: store.state.gameState.selectedSpace,
    dest: clickedSpace,
    size: store.getters["gameState/getLargestPiece"](
      store.state.gameState.selectedSpace
    ).size,
  });
  unselectSpace();
};

const clickSpace = (clickedSpace) => {
  console.log("old selected ", store.state.gameState.selectedSpace);
  console.log("clicked ", clickedSpace);
  if (store.state.gameState.selectedSpace === undefined) {
    selectSpace(clickedSpace);
  } else if (_.isEqual(store.state.gameState.selectedSpace, clickedSpace)) {
    unselectSpace();
  } else {
    moveToSpace(clickedSpace);
  }
  console.log("selected", store.state.gameState.selectedSpace);
};
</script>
