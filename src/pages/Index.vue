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

let selectedSpace = undefined;

const clickSpace = (clickedSpace) => {
  console.log("old selected ", selectedSpace);
  console.log("clicked ", clickedSpace);
  if (selectedSpace === undefined) {
    selectedSpace = clickedSpace;
  } else {
    if (_.isEqual(selectedSpace, clickedSpace)) {
      selectedSpace = undefined;
    } else if (clickedSpace === undefined) {
      store.dispatch("gameState/movePiece", {
        start: selectedSpace,
        dest: clickedSpace,
        size: store.getters["gameState/getLargestPiece"](selectedSpace).size,
      });
    }
  }

  console.log("selected", selectedSpace);
};
</script>
