import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketHoldersService {


  async getTicketsByEventId(eventId) {
    const ticketHolders = await dbContext.TicketHolders.find({ eventId })
      .populate('profile', 'name picture')
    return ticketHolders
  }

  async createTicketHolder(ticketHolderData) {
    // const event = await eventsService.getOneEventById(ticketHolderData.eventId)
    // if (event.isCanceled) {
    //   throw new Forbidden('Event is canceled, justin beiber had better things to do')
    // }
    const ticketHolder = await dbContext.TicketHolders.create(ticketHolderData)
    await ticketHolder.populate('profile', 'name picture')
    await ticketHolder.populate('event')
    if(ticketHolder){
      await eventsService.editEventCapacity(ticketHolder.eventId,-1)
    }
    return ticketHolder
  }

  async deleteTicketById(ticketId, requestorId) {
    const ticket = await dbContext.TicketHolders.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('Invalid Id, bro')
    }


    if (ticket.accountId.toString() !== requestorId) {
      throw new Forbidden("Nice try, bro")
    }
    if(ticket){
      await eventsService.editEventCapacity(ticket.eventId,1)
    }
    await ticket.remove()
    return 'Ticket deleted'
  }

}

export const ticketHoldersService = new TicketHoldersService()