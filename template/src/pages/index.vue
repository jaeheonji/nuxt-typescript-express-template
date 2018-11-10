<template>
  <div>
    <logo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class extends Vue {}
</script>

<style>
</style>
