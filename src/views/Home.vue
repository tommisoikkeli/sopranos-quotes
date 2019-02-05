<template>
  <div class="home">
    <Button content="Get a random quote!" type="random" :onClick="getRandomQuote"/>
    <p>{{ quote }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import QuotesApi from '@/api/QuotesApi';
import { IQuote } from '@/models/models';

@Component({
  components: {
    Button,
  },
})
export default class Home extends Vue {
  private quote: string = '';

  private mounted() {
    this.getRandomQuote();
  }

  private getRandomQuote(): void {
    QuotesApi.getRandomQuote().then((quote: IQuote) => this.quote = quote.quoteText);
  }
}
</script>
