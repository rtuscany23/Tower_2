<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1 class="text-dark">Totally Cool Upcoming Events</h1>
      </div>

      <div class="col-10 m-auto">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterType('')" class="btn btn-outline-light">All</button>
          <button @click="changeFilterType('concert')" class="btn btn-outline-light">Concert</button>
          <button @click="changeFilterType('convention')" class="btn btn-outline-light">Convention</button>
          <button @click="changeFilterType('sport')" class="btn btn-outline-light">Sport</button>
          <button @click="changeFilterType('digital')" class="btn btn-outline-light">Digital</button>
        </div>
      </div>


      <div v-for="e in events" class="col-md-3">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watchEffect, computed, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const filterType = ref('')

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error, "[Getting AllEvents]");
      }
    }

    onMounted(() => {
      getAllEvents();
    });

    return {
      events: computed(() => {
        if (!filterType.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterType.value)
        }
      }),
      account: computed(() => AppState.account),
      changeFilterType(type) {
        filterType.value = type
      },

    }
  },
  components: { EventCard }
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
