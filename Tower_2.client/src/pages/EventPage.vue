<template>
  <div class="EventPage container-fluid" v-if="event">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="row d-flex justify-content-between bg-info p-2 text-light rounded mb-3">
          <div class="col-5">
            <img :src="event.coverImg" alt="" class="img-fluid rounded">
          </div>

          <div class="col-7">
            <div class="row">
              <div class="col-6">
                <p><b>{{ event.name }}</b></p>
              </div>
              <div class="col-6">
                <p><b>{{ new Date(event.startDate).toLocaleDateString('uk') }}</b></p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ event.location }}</p>
              </div>
              <div class="col-6"></div>
            </div>
            <div class="row">
              <p>{{ event.description }}</p>
            </div>


            <div>
              <button v-if="account.id && !event.isCanceled && !foundTicket" @click="createTicket()"
                class="btn btn-warning">
                <i class="mdi mdi-plus-box"></i>
                <span>
                  Attend
                </span>
              </button>
              <div v-else-if="event.isCanceled" class="bg-danger rounded text-center p-3">
                <i class="mdi mdi-lock"></i>
                <span>
                  Canceled
                </span>
              </div>
            </div>
          </div>



          <div class="col-12 mb-3 d-flex justify-content-around">
            <div class="bg-warning rounded p-2 fw-bold">
              <!-- <div>{{ collabs.length }}</div> -->
              <div>People Attending</div>
            </div>
            <!-- <button v-if="!foundCollab" @click="createCollaboration()" :disabled="album.archived" class="btn btn-success">
              <i class="mdi mdi-heart"></i>
              <br>
              <b>Collab</b>
            </button> -->

            <!-- <button v-else @click="removeCollaboration(foundCollab.collaboratorId)" class="btn btn-danger">
              <i class="mdi mdi-close-circle"></i>
              <br>
              <b>UnCollab</b>
            </button> -->
          </div>
          <div class="col-12">
            <div class="row">
              <div v-for="t in tickets" class="col-4">
                <img class="img-fluid rounded" :src="t.picture" :alt="t.name + ' picture'" :title="t.name">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <form @submit.prevent="createComment()">
          <div class="mb-3">
            <label for="body" class="form-label">Add Comment</label>
            <input v-model="editable.body" type="text" class="form-control" id="body">
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-4">

        <div v-for="c in comments">
          <CommentCard :comment="c" />
        </div>

      </div>
    </div>
  </div>

  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i
        class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
  </div>
</template>


<script>
import { onMounted, computed, watchEffect, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    const router = useRouter()

    async function getOneEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getOneEventById(eventId)
      } catch (error) {
        Pop.error('[Getting Event By Id]')
        router.push('/') // bad event Id
      }
    }

    async function getTicketsByEventId() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getComments() {
      try {
        const eventId = route.params.eventId
        await commentsService.getComments(eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }


    watchEffect(() => {
      if (route.params.eventId) {
        getOneEventById()
        getComments()
        getTicketsByEventId()
      }
    })

    return {
      editable,
      event: computed(() => AppState.event),
      // pictures: computed(() => AppState.pictures),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      foundTicket: computed(() => AppState.tickets.find(t => t.id == AppState.account.id)),

      async createComment() {
        try {
          const formData = { ...editable.value, eventId: route.params.eventId };
          await commentsService.createComment(formData);
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async createTicket() {
        try {
          await ticketsService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }


    }
  }
}

</script>


<style lang="scss" scoped></style>
