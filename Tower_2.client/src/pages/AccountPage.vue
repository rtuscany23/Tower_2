<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <h1>{{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-4">
        <h1 class="text-dark">Attending Events:</h1>
      </div>

      <p>{{ myTickets }}</p>

      <!-- <div v-for="e in events" class="col-md-3">
        <EventCard :event="e" />
      </div> -->

    </div>
  </div>
</template>

<script>
import { onMounted, watchEffect, computed } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { accountService } from "../services/AccountService.js";
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';

export default {

  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error, "[Getting AllEvents]");
      }
    }

    async function getMyEvents() {
      try {
        await accountService.getMyEvents();
      }
      catch (error) {
        console.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getMyEvents();
    });

    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      myTickets: computed(() => AppState.myTickets),
    }
  },
  components: { EventCard }
}

</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
