<template>
  <img :src="source"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Img extends Vue {
  @Prop() private source!: string;
}
</script>
