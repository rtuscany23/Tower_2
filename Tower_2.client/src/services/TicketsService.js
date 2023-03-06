import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async getTicketsByEventId(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }

  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    AppState.event.capacity --
    AppState.tickets.push(new Ticket(res.data))
  }

async deleteTicket(eventId) {
  const ticketIndex = AppState.tickets.findIndex(t => t.eventId == eventId && t.accountId == AppState.account.id)
  if (ticketIndex !== -1) {
    const ticketId = AppState.tickets[ticketIndex].ticketId
    const res = await api.delete('api/tickets/' + ticketId)
    AppState.event.capacity ++
    AppState.tickets.splice(ticketIndex, 1)
  }
}

}

export const ticketsService = new TicketsService()