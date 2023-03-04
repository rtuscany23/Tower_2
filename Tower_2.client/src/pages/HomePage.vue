<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1 class="text-dark">Totally Cool Upcoming Events</h1>
      </div>
      <div v-for="e in events" class="col-md-3">
        <EventCard :event="e" />
      </div>
    </div>
  </div>

  <!-- <div class="container">
      <div class="row my-4">
        <div class="col-12 p-4 mb-3">
          <h1 class="text-light">Events</h1>
        </div>
        <div class="col-10 m-auto">
          <div class="bg-primary rounded p-3 d-flex justify-content-around">
            <button @click="changeFilterCategory('')" class="btn btn-outline-light">All</button>
            <button @click="changeFilterCategory('animals')" class="btn btn-outline-light">Animals</button>
            <button @click="changeFilterCategory('games')" class="btn btn-outline-light">Games</button>
            <button @click="changeFilterCategory('misc')" class="btn btn-outline-light">Misc</button>
          </div>
        </div>
        <div class="col-md-3" v-for="a in albums" :key="a.id">
          <AlbumCard :album="a" />
        </div>
      </div>
    </div> -->
</template>

<script>
import { onMounted, computed } from 'vue';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    // const filterCategory = ref('')

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
      account: computed(() => AppState.account),
      events: computed(() => AppState.events

        // {
        //   if (!filterCategory.value) {
        //     return AppState.events
        //   }
        //   else {
        //     return AppState.events.filter(e => e.category == filterCategory.value)
        //   }
        // }

      ),


      //myEvents: computed(() => AppState.myEvents),      
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
