<template>
  <a :href="url" target="_blank" class="name-link">
    <h3>{{ name }}</h3>
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NameLink extends Vue {
  @Prop() private url!: string;
  @Prop() private name!: string;
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.name-link {
  color: $black;
  text-decoration: none;
  &:hover {
    color: lighten($black, 30%);
  }
}
</style>
