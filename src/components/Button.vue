<template>
  <button :class="['button', type]" @click="onClick">
    <div class="button-content">
      {{ content }}
    </div>
  </button>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  enum ButtonType {
    DEFAULT = 'default',
    RANDOM = 'random',
    RATING = 'rating',
    DISABLED = 'disabled',
  }

  @Component
  export default class Button extends Vue {
    @Prop() private content!: string;
    @Prop() private type!: ButtonType;
    @Prop() private onClick!: () => void;
  }
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.button {
    flex: 1 1 auto;
    padding: 10px;

    &:hover {
      cursor: pointer;
    }

    &.default {
      background: $default-button-background;
      border-radius: 3px;
    }

    &.random {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      outline: none;
    }

    &.rating {
      background: $rating-button-background;
      color: $white;
      border-radius: 25px;
    }
  }
</style>
