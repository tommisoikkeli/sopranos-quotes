<template>
  <div class="error">
    <p>Sorry, something went wrong.</p>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Error extends Vue {}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.error {
  border: 1px solid $error-red;
  background: $error-red;
  margin-bottom: 10px;
  border-radius: 3px;
}
</style>
