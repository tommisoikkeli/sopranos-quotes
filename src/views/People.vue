<template>
  <div>
    <Error v-if="hasError"/>
    <div class="people-view">
      <div v-for="person in people" :key="person.id">
        <PersonCard :person="person"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPerson } from '@/models/models';
import QuotesApi from '@/api/QuotesApi';
import PersonCard from '@/components/PersonCard.vue';
import Error from '@/components/Error.vue';

@Component({
  components: {
    PersonCard,
    Error,
  },
})
export default class People extends Vue {
  private people: IPerson[] = [];
  private hasError: boolean = false;

  private created(): void {
    QuotesApi.getPeople().then((people: IPerson[]) => this.people = people)
    .catch((e) => this.hasError = true);
  }
}
</script>
