<template>
  <button :id="id && id" :class="['button', type]" @click="onClick" :disabled="isDisabled" :title="isDisabled && 'Already rated'">
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
  @Prop() private id!: string;
  @Prop() private content!: string;
  @Prop() private type!: ButtonType;
  @Prop() private onClick!: () => void;

  private get isDisabled(): boolean {
    return this.type === 'liked';
  }
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
    &:hover {
      background: darken($default-button-background, 5%);
    }
  }

  &.random {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    outline: none;
    border: 1px solid $border-color;
    &:hover {
      border-color: darken($border-color, 20%);
    }
    &:disabled {
      animation: fill 2s linear;
      cursor: not-allowed;
    }
  }

  &.rating {
    background: $rating-button-background;
    color: $white;
    border-radius: 25px;
    border: none;
    &:focus {
      outline: 2px solid $rating-button-outline;
    }
    &:hover {
      background: darken($rating-button-background, 5%);
    }
  }

  &.liked {
    background: $rating-button-background;
    color: $liked-button-red;
    border-radius: 25px;
    font-weight: bold;
    border:none;
      
    &:hover {
      cursor: not-allowed;
    }
  }
}
@keyframes fill {
  0% {
    background: darken($white, 15%);
  }
  100% {
    background: $white;
  }
}
</style>
