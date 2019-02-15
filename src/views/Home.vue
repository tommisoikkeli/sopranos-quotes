<template>
  <div class="home">
    <div v-if="hasError" class="error">
      <p>Sorry, something went wrong.</p>
    </div>
    <QuoteCard :onQuoteCardButtonClick="rateQuote" :quote="this.quote" :isQuoteRated="isQuoteRated"/>
    <Button type="random" content="Get a random quote!" :onClick="getRandomQuote" id="random-button"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QuotesApi from '@/api/QuotesApi';
import { IQuote } from '@/models/models';
import QuoteCard from '@/components/QuoteCard.vue';
import Button from '@/components/Button.vue';
import { setLocalStorageItem, getLocalStorageItems, isRated, disableButtonForTimeout } from '@/utils/utils';

const BUTTON_TIMEOUT: number = 2000;

@Component({
  components: {
    QuoteCard,
    Button,
  },
})
export default class Home extends Vue {
  private quote: IQuote = {} as IQuote;
  private ratedQuotes: IQuote[] = this.getRatedQuotes();
  private hasError: boolean = false;

  private created(): void {
    this.getRandomQuote();
  }

  private getRandomQuote(): void {
    QuotesApi.getRandomQuote().then((quote: IQuote) => this.quote = quote)
    .catch((e) => this.hasError = true);
    disableButtonForTimeout('random-button', BUTTON_TIMEOUT);
  }

  private rateQuote(): void {
    QuotesApi.saveQuoteRating(this.quote.id)
      .then((updatedQuote: IQuote) => this.quote = updatedQuote)
      .then(() => setLocalStorageItem('ratedQuotes', this.quote))
      .then(() => this.ratedQuotes = this.getRatedQuotes())
      .catch((e) => this.hasError = true);
  }

  private getRatedQuotes(): IQuote[] {
    return getLocalStorageItems('ratedQuotes');
  }

  private get isQuoteRated(): boolean {
    return isRated(this.ratedQuotes, this.quote.id);
  }
}
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

