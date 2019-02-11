<template>
  <div class="home">
    <QuoteCard :onQuoteCardButtonClick="rateQuote" :quote="this.quote" :isQuoteRated="isQuoteRated"/>
    <Button type="random" content="Get a random quote!" :onClick="getRandomQuote"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QuotesApi from '@/api/QuotesApi';
import { IQuote } from '@/models/models';
import QuoteCard from '@/components/QuoteCard.vue';
import Button from '@/components/Button.vue';
import { setLocalStorageItem, getLocalStorageItems } from '@/utils/utils';

@Component({
  components: {
    QuoteCard,
    Button,
  },
})
export default class Home extends Vue {
  private quote: IQuote = {} as IQuote;
  private ratedQuotes: IQuote[] = getLocalStorageItems('ratedQuotes');

  private mounted(): void {
    this.getRandomQuote();
  }

  private getRandomQuote(): void {
    QuotesApi.getRandomQuote().then((quote: IQuote) => this.quote = quote);
  }

  private rateQuote(): void {
    QuotesApi.saveQuoteRating(this.quote.id)
      .then((updatedQuote: IQuote) => this.quote = updatedQuote)
      .then(() => setLocalStorageItem('ratedQuotes', this.quote));
  }

  private get isQuoteRated(): boolean {
    return this.ratedQuotes.map((item: IQuote) => item.id).indexOf(this.quote.id) !== -1;
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
