<template>
  <div class="row">
    <ReserveSpace
      v-for="col_i in NUM_RESERVE_STACKS"
      :key="col_i"
      :id="col_i - 1"
      :owner="owner"
      @click="
        $emit('click', {
          area: 'reserves',
          coords: { row: owner, col: col_i - 1 },
        })
      "
    />
  </div>
</template>

<script setup>
import ReserveSpace from "components/ReserveSpace";

const props = defineProps({
  owner: { type: Number, required: true },
});

const emit = defineEmits(["click"]);

const { NUM_RESERVE_STACKS } = require("src/store/game-state/constants");
</script>

<style scoped></style>
