<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h3 class="test-white">TOWER</h3>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <button v-if="account.id" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#eventModal">
            <i class="mdi mdi-plus-box"></i>
            New Event
          </button>
        </li>
        <li>

          <!-- <button @click="archiveAlbum(album.id)"
            v-if="account.id && route.name == 'Album' && album?.creatorId == account.id" class="btn btn-success ms-4"
            :disabled="album.archived">
            <i class="mdi mdi-close-circle text-dark"></i>
            {{ album.archived ? 'archived' : 'close album' }}
          </button> -->

        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import Login from './Login.vue'
export default {
  setup() {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event)


      // ,
      // async archiveAlbum(albumId) {
      //   try {
      //     if (await Pop.confirm('Are you sure bud?', 'Really bud????', 'Alright, bud')) {
      //       await albumsService.archiveAlbum(albumId)
      //     }
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.error(error.message)
      //   }
      // }


    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
