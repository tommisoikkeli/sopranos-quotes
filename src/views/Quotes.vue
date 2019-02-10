<template>
  <div class="quotes-container">
    <h3>{{ personInfo.name }}</h3>
    <Img :source="personInfo.image"/>
    <div v-for="quote in personInfo.quotes" v-bind:key="quote.id">
      <QuoteCard :quote="quote" :hasImage="false" :isRandom="false" :onQuoteCardButtonClick="rateQuote"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import QuoteCard from '@/components/QuoteCard.vue';
import { IPerson } from '@/models/models';
import QuotesApi from '@/api/QuotesApi';
import Img from '@/components/Img.vue';

@Component({
  components: {
    QuoteCard,
    Img,
  },
})
export default class Quotes extends Vue {
  private personInfo: IPerson = {} as IPerson;

  private mounted() {
    QuotesApi.getAllQuotesForPerson(parseInt(this.$route.params.id, 10))
      .then((personData: IPerson) => this.personInfo = personData);
  }

  private rateQuote(): void {
    console.log('+1');
  }
}
</script>

<style lang="scss">
.quotes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 20px;
  }
}
</style>

