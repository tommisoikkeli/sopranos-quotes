<template>
  <div class="best-quotes">
    <div v-for="quote in quotes" v-bind:key="quote.id">
      <QuoteCard :quote="quote" :onQuoteCardButtonClick="rateQuote.bind(this, quote.id)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import QuotesApi from '@/api/QuotesApi';
import { IQuote } from '@/models/models';
import QuoteCard from '@/components/QuoteCard.vue';

@Component({
  components: {
    QuoteCard,
  },
})
export default class BestQuotes extends Vue {
  private quotes: IQuote[] = [];

  private mounted() {
    this.getTopRatedQuotes();
    setTimeout(() => console.log(this.quotes), 1000);
  }

  private getTopRatedQuotes(): void {
    QuotesApi.getTopRatedQuotes().then((quotes: IQuote[]) => this.quotes = quotes);
  }

  private rateQuote(id: number) {
    console.log('+1', id);
  }
}
</script>
