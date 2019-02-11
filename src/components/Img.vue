<template>
  <img :class="['image', type]" :src="source"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type ImgType = 'default' | 'round';

@Component
export default class Img extends Vue {
  @Prop() private source!: string;
  @Prop() private type!: ImgType;
}
</script>

<style lang="scss">
.image {
  object-fit: cover;
  width: 280px;
  height: 280px;
  margin-bottom: 10px;

  &.default {
    border-radius: 5px;
  }

  &.round {
    border-radius: 50%;
  }
}
</style>
