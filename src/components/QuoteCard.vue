<template>
  <div v-if="isQuoteDefined" class="quote-card-container">
    <h3 v-if="isRandom">{{ quote.person.name }}</h3>
    <Img v-if="hasImage" :source="quote.person.image" type="default"/>
    <div class="quote-text">
      <p>{{ quote.quoteText }}</p>
    </div>
    <div class="quote-card-rating">
      <p>Rating: {{ quote.rating }}</p>
      <Button :type="isQuoteRated ? 'liked' : 'rating'" content="+1" :onClick="onQuoteCardButtonClick"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Img from '@/components/Img.vue';
import Button from '@/components/Button.vue';
import { IQuote } from '@/models/models';

@Component({
  components: {
    Img,
    Button,
  },
})
export default class QuoteCard extends Vue {
  @Prop() private quote!: IQuote;
  @Prop() private onQuoteCardButtonClick!: () => void;
  @Prop({default: true}) private hasImage!: boolean;
  @Prop({default: true}) private isRandom!: boolean;
  @Prop({default: false}) private isQuoteRated!: boolean;

  private get isQuoteDefined(): boolean {
    return Object.keys(this.quote).length > 0;
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.quote-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: $card-padding;
  border: 1px solid $border-color;
  margin-bottom: 15px;
  box-shadow: $box-shadow;
  width: 500px;

  @include tablet {
    width: 400px;
  }

  @include mobile {
    width: 280px;
    padding: 8px;
    margin-bottom: 10px;
  }

  .quote-card-rating {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
    }
  }
}
</style>
