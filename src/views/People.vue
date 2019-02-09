<template>
  <div class="people-view">
    <div v-for="person in people" :key="person.id">
      <p>{{ person.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPerson } from '@/models/models';
import QuotesApi from '@/api/QuotesApi';

@Component
export default class People extends Vue {
  private people: IPerson[] = [];

  private mounted(): void {
    QuotesApi.getPeople().then((people: IPerson[]) => this.people = people);
  }
}
</script>
