<template>
  <router-link class="text-light selectable" :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="EventCard card my-3 bg-dark">
      <img :src="event.coverImg" alt="">
      <div class="card-body text-center">
        <p class="mb-0">
          <b>{{ event.name }}</b>
        </p>
        <p class="">
          <i class="mdi mdi-heart"></i>
        </p>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from 'vue';
import { Event } from '../models/Event.js';

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {

    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.EventCard {
  height: 40vh;
  overflow: hidden;
  text-shadow: 0 0 4px black;
  letter-spacing: .07rem;

  img {
    height: 30vh;
    object-fit: cover;
    object-position: bottom;
  }
}
</style>
