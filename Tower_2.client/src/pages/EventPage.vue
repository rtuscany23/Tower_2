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
              <div class="col-6" v-if="!event.isCanceled">
                <p><b>{{ event.name }}</b></p>
              </div>
              <div class="col-6" v-else-if="event.isCanceled">
                <p class="text-decoration-line-through"><b>{{ event.name }}</b></p>
              </div>
              <div class="col-6">
                <p><b>{{ new Date(event.startDate).toLocaleDateString('uk') }}</b></p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ event.location }}</p>
              </div>
              <div class="col-6">
                <p>Seats left: {{ event.capacity }}</p>
              </div>
            </div>
            <div class="row">
              <p>{{ event.description }}</p>
            </div>


            <div>
              <div class="p-1">
                <button v-if="account.id == event.creatorId && !event.isCanceled" @click="cancelEvent()"
                  class="btn btn-danger">
                  <span>
                    Cancel Event
                  </span>
                </button>
              </div>
              <div class="p-1">
                <button v-if="account.id && !event.isCanceled && !foundTicket && event.capacity > 0"
                  @click="createTicket()" class="btn btn-warning">
                  <i class="mdi mdi-plus-box"></i>
                  <span>
                    Attend
                  </span>
                </button>
              </div>
              <div class="p-1">
                <button v-if="account.id && !event.isCanceled && foundTicket" @click="deleteTicket()"
                  class="btn btn-danger">
                  <span>
                    Cancel Ticket
                  </span>
                </button>
              </div>
              <div v-if="event.isCanceled" class="bg-danger rounded text-center p-3 my-3">
                <i class="mdi mdi-lock"></i>
                <span>
                  Event Canceled
                </span>
              </div>
              <div v-if="event.capacity == 0" class="bg-danger rounded text-center p-3 my-3">
                <i class="mdi mdi-lock"></i>
                <span>
                  Event Sold Out
                </span>
              </div>
            </div>
          </div>



          <div class="col-12 my-3 d-flex justify-content-around">
            <div class="bg-warning rounded p-2 fw-bold">
              <!-- <div>{{ collabs.length }}</div> -->
              <div class="p-1">People Attending</div>
            </div>
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
    const eventId = route.params.eventId

    async function getOneEventById() {
      try {
        await eventsService.getOneEventById(eventId)
      } catch (error) {
        Pop.error('[Getting Event By Id]')
        router.push('/') // bad event Id
      }
    }

    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getComments() {
      try {
        await commentsService.getComments(eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }

    async function deleteTicket() {
      try {
        const deletedTicket = await ticketsService.deleteTicket(eventId)
        logger.log(deletedTicket)
      }
      catch (error) {
        console.error(error)
        Pop.error(error)
      }
    }

    async function cancelEvent() {
      try {
        const canceledEvent = await eventsService.cancelEvent(eventId)
        logger.log(canceledEvent)
      }
      catch (error) {
        console.error(error)
        Pop.error(error)
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
      deleteTicket,
      cancelEvent,

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
          const newTicket = await ticketsService.createTicket({ eventId: route.params.eventId })
          logger.log(newTicket)
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
