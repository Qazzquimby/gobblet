<template>
  <q-page class="flex flex-center">
    <div class="board" style="height: 100%; width: 100%">
      <div v-for="row_i in NUM_ROWS_COLS" :key="row_i" class="row">
        <Space
          v-for="col_i in NUM_ROWS_COLS" :key="col_i"
          :row="row_i-1"
          :col="col_i-1"
        />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import Space from 'components/Space';
const {NUM_ROWS_COLS} = require('src/store/game-state/constants');

</script>
