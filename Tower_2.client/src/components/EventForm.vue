<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="name" class="form-label">Event Name</label>
          <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="coverImg" class="form-label">Cover Image</label>
          <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <label for="type" class="form-label">Event Type</label>
        <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="type">
          <option selected value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
        <div class="mb-3">
          <label for="description" class="form-label">Event Description</label>
          <input v-model="editable.description" required type="text" class="form-control" id="description"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Event Location</label>
          <input v-model="editable.location" required type="text" class="form-control" id="location"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="capacity" class="form-label">Event Capacity</label>
          <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">Event Start Date</label>
          <datepicker v-model="editable.startDate" id="startDate" required></datepicker>
        </div>


      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import Datepicker from 'vue3-datepicker';

export default {
  components: {
    Datepicker,
  },

  setup() {
    const editable = ref({
      category: 'concert'
    })

    return {
      editable,
      async createEvent() {
        try {
          const formData = editable.value
          await eventsService.createEvent(formData)
          editable.value = {}
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