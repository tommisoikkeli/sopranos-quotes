<template>
  <div class="home">
    <Error v-if="hasError"/>
    <div>
      <Loading v-if="isLoading"/>
      <QuoteCard v-else :onQuoteCardButtonClick="rateQuote" :quote="this.quote" :isQuoteRated="isQuoteRated"/>
    </div>
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
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';

const BUTTON_TIMEOUT: number = 2000;

@Component({
  components: {
    QuoteCard,
    Button,
    Error,
    Loading,
  },
})
export default class Home extends Vue {
  private quote: IQuote = {} as IQuote;
  private ratedQuotes: IQuote[] = this.getRatedQuotes();
  private hasError: boolean = false;
  private isLoading: boolean = true;

  private created(): void {
    this.getRandomQuote();
  }

  private getRandomQuote(): void {
    QuotesApi.getRandomQuote().then((quote: IQuote) => {
      this.quote = quote;
      this.isLoading = false;
    })
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
