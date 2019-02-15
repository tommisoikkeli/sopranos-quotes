<template>
  <div class="best-quotes">
    <div v-if="hasError" class="error">
      <p>Sorry, something went wrong.</p>
    </div>
    <div v-for="quote in quotes" v-bind:key="quote.id">
      <QuoteCard :quote="quote" :onQuoteCardButtonClick="rateQuote.bind(this, quote.id)" :isQuoteRated="isQuoteRated(quote.id)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import QuotesApi from '@/api/QuotesApi';
import { IQuote } from '@/models/models';
import QuoteCard from '@/components/QuoteCard.vue';
import { setLocalStorageItem, getLocalStorageItems, isRated } from '@/utils/utils';

@Component({
  components: {
    QuoteCard,
  },
})
export default class BestQuotes extends Vue {
  private quotes: IQuote[] = [];
  private ratedQuotes: IQuote[] = this.getRatedQuotes();
  private hasError: boolean = false;

  private created() {
    this.getTopRatedQuotes();
  }

  private getTopRatedQuotes(): void {
    QuotesApi.getTopRatedQuotes().then((quotes: IQuote[]) => this.quotes = quotes)
    .catch((e) => this.hasError = true);
  }

  private rateQuote(id: number) {
    QuotesApi.saveQuoteRating(id)
    .then((ratedQuote: IQuote) => setLocalStorageItem('ratedQuotes', ratedQuote))
    .then(() => this.ratedQuotes = this.getRatedQuotes())
    .then(() => this.getTopRatedQuotes())
    .catch((e) => this.hasError = true);
  }

  private isQuoteRated(id: number): boolean {
    return isRated(this.ratedQuotes, id);
  }

  private getRatedQuotes(): IQuote[] {
    return getLocalStorageItems('ratedQuotes');
  }
}
</script>
