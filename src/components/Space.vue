<template>
  <q-responsive :ratio="1" class="space-wrapper col" @click="change">
    <span v-for="(owner, piece_i) in pieces" :key="piece_i">
      <span v-if="owner !== undefined">
        <Piece :owner="owner"/>
      </span>
    </span>
  </q-responsive>
</template>

<script setup>
import {useStore} from 'vuex';
import Piece from 'components/Piece';

const $store = useStore();

const props = defineProps({
  row: {type: Number, required: true},
  col: {type: Number, required: true},
});

const pieces = $store.state.gameState.board[props.row][props.col];

const change = () => {
  console.log('MAKE CHANGE HERE PLEASE');
};
</script>

<style scoped lang="sass">
.space-wrapper
  border-radius: 10%
  border: dashed black
  margin: 2px
</style>
