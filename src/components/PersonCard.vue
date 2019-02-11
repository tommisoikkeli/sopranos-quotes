<template>
  <div class="person-card-container">
    <h3>{{ person.name }}</h3>
    <Img :source="person.image" type="round"/>
    <router-link :to="`/people/${person.id}`">
      <Button content="See quotes" type="default" :onClick="() => false"/>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPerson } from '@/models/models';
import Button from '@/components/Button.vue';
import Img from '@/components/Img.vue';

@Component({
  components: {
    Button,
    Img,
  },
})
export default class PersonCard extends Vue {
  @Prop() private person!: IPerson;
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.people-view {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 15px;

  .person-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid $border-color;
    box-shadow: $box-shadow;
    padding: $card-padding;
    margin: 10px 0;
    width: 400px;
}
}
</style>
