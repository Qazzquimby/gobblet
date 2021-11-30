<template>
  <q-page class="row items-center justify-evenly">
    <game />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Game from 'components/Game.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { Game },
});
</script>
