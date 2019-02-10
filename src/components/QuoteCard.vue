<template>
  <div v-if="isQuoteDefined" class="quote-card-container">
    <h3 v-if="isRandom">{{ quote.person.name }}</h3>
    <Img v-if="hasImage" :source="quote.person.image"/>
    <div class="quote-text">
      <p>{{ quote.quoteText }}</p>
    </div>
    <div class="quote-card-rating">
      <p>Rating: {{ quote.rating }}</p>
      <Button type="rating" content="+1" :onClick="onQuoteCardButtonClick"/>
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

  private get isQuoteDefined(): boolean {
    return Object.keys(this.quote).length > 0;
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.quote-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px;
    border: 1px solid $border-color;
    margin-bottom: 30px;
    box-shadow: 1px 1px 1px 0 $card-box-shadow;
    width: 500px;

    .quote-card-rating {
      display: flex;
      align-items: center;
      button {
        margin-left: 10px;
      }
    }
}
</style>
