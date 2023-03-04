import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {

  async getAllEvents() {
    const res = await api.get('api/events')
    const events = res.data.map(e => new Event(e))
    AppState.events = events
  }

  async createEvent(formData) {
    const res = await api.post('api/events', formData)
    logger.log('creating event', res.data)
  }

  async getOneEventById(eventId) {
    AppState.event = null
    const res = await api.get('api/events/'+eventId)
    AppState.event = new Event(res.data)
  }
  
}

export const eventsService = new EventsService()


  
// async archiveAlbum(albumId) {
//   const res = await api.delete('api/albums/' + albumId)
//   logger.log('archiving album', res.data)
//   AppState.album = new Album(res.data)
// }