<template>
  <button :class="['button', type]" @click="onClick">
    <div class="button-content">
      {{ content }}
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type ButtonType = 'default' | 'random' | 'rating' | 'liked';

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
      border: 1px solid $border-color;
      &:hover {
        border-color: darken($border-color, 10%);
      }
    }

    &.rating {
      background: $rating-button-background;
      color: $white;
      border-radius: 25px;
      &:focus {
        outline: 2px solid $rating-button-outline;
      }
      &:hover {
        background: darken($rating-button-background, 5%);
      }
    }

    &.liked {
      background: $rating-button-background;
      color: red;
      border-radius: 25px;
    }
  }
</style>
