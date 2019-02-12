<template>
  <div class="quotes-container">
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
import { getLocalStorageItems, setLocalStorageItem, findById, isRated } from '@/utils/utils';

@Component({
  components: {
    QuoteCard,
    Img,
  },
})
export default class Quotes extends Vue {
  private personInfo: IPerson = {} as IPerson;
  private ratedQuotes: IQuote[] = this.getRatedQuotes();

  private mounted() {
    this.getAllQuotesForPerson();
  }

  private rateQuote(id: number): void {
    QuotesApi.saveQuoteRating(id)
    .then(() => setLocalStorageItem('ratedQuotes', findById(this.personInfo.quotes, id)))
    .then(() => this.ratedQuotes = this.getRatedQuotes())
    .then(() => this.getAllQuotesForPerson());
  }

  private getAllQuotesForPerson(): void {
    QuotesApi.getAllQuotesForPerson(parseInt(this.$route.params.id, 10))
      .then((personData: IPerson) => this.personInfo = personData)
      .then((personData: IPerson) => {
        this.personInfo.quotes.sort((a, b) => b.rating - a.rating);
      });
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

