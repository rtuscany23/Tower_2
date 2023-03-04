import { AppState } from "../AppState.js"
import { TicketHolderProfile } from "../models/TicketHolderProfile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async getTicketsByEventId(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    logger.log('get tickets', res.data)
    AppState.tickets = res.data.map(t => new TicketHolderProfile(t))
  }

  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('creating ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
    // AppState.myAlbums.push(new CollabAlbum(res.data))
  }

  // async removeCollaboration(collaboratorId) {
  //   const res = await api.delete(`api/collaborators/${collaboratorId}`)
  //   logger.log('removing collab', res.data)
  //   const collabIndex = AppState.collabs.findIndex(c => c.collaboratorId == collaboratorId)
  //   if (collabIndex !== -1) {
  //     AppState.collabs.splice(collabIndex, 1)
  //   }
  // }

  // async getMyCollabinAlbums() {
  //   const res = await api.get('account/collaborators')
  //   logger.log('getting my collabin albums', res.data)
  //   AppState.myAlbums = res.data.map(a => new CollabAlbum(a))
  // }
}

export const ticketsService = new TicketsService()