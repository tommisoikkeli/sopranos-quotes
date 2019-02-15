<template>
  <div class="quotes-container">
    <Error v-if="hasError"/>
    <h3>{{ personInfo.name }}</h3>
    <Img :source="personInfo.image" type="default"/>
    <div v-for="quote in personInfo.quotes" v-bind:key="quote.id">
      <QuoteCard :quote="quote" :hasImage="false" :isRandom="false" :onQuoteCardButtonClick="rateQuote.bind(this, quote.id)"
                  :isQuoteRated="isQuoteRated(quote.id)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import QuoteCard from '@/components/QuoteCard.vue';
import { IPerson, IQuote } from '@/models/models';
import QuotesApi from '@/api/QuotesApi';
import Img from '@/components/Img.vue';
import { getLocalStorageItems, setLocalStorageItem, isRated } from '@/utils/utils';
import Error from '@/components/Error.vue';

@Component({
  components: {
    QuoteCard,
    Img,
    Error,
  },
})
export default class Quotes extends Vue {
  private personInfo: IPerson = {} as IPerson;
  private ratedQuotes: IQuote[] = this.getRatedQuotes();
  private hasError: boolean = false;

  private created() {
    this.getAllQuotesForPerson();
  }

  private rateQuote(id: number): void {
    QuotesApi.saveQuoteRating(id)
    .then((ratedQuote: IQuote) => setLocalStorageItem('ratedQuotes', ratedQuote))
    .then(() => this.ratedQuotes = this.getRatedQuotes())
    .then(() => this.getAllQuotesForPerson())
    .catch((e) => this.hasError = true);
  }

  private getAllQuotesForPerson(): void {
    QuotesApi.getAllQuotesForPerson(parseInt(this.$route.params.id, 10))
      .then((personData: IPerson) => this.personInfo = personData)
      .then(() => {
        this.personInfo.quotes.sort((a, b) => b.rating - a.rating);
      })
      .catch((e) => this.hasError = true);
  }

  private isQuoteRated(id: number): boolean {
    return isRated(this.getRatedQuotes(), id);
  }

  private getRatedQuotes(): IQuote[] {
    return getLocalStorageItems('ratedQuotes');
  }
}
</script>

<style lang="scss">
.quotes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

