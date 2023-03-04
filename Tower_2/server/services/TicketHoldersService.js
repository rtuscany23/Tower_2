import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketHoldersService {
  // async destroyAlbumMemberById(albumMemberId, requestorId) {
  //   const albumMember = await dbContext.AlbumMembers.findById(albumMemberId)
  //   if (!albumMember) {
  //     throw new BadRequest('Invalid Id, nerd 🤓')
  //   }
  //   if (albumMember.accountId.toString() !== requestorId) {
  //     throw new Forbidden("I'm onto you, nerd 🤓")
  //   }
  //   await albumMember.remove()
  //   return 'No longer a collaborator, nerd! 🤓'
  // }

  // async getAlbumsThatIAmACollaboratorOn(accountId) {
  //   // NOTE nested populate. It's complicated https://dev.to/rajeshroyal/how-to-populate-nested-document-in-mongodb-3a91
  //   const albums = await dbContext.AlbumMembers.find({ accountId })
  //     .populate({
  //       path: 'album',
  //       populate: {
  //         path: 'creator albumMemberCount',
  //         select: 'name picture'
  //       }
  //     })
  //   return albums
  // }

  async getTicketsByEventId(eventId) {
    const ticketHolders = await dbContext.TicketHolders.find({ eventId })
      .populate('profile', 'name picture')
    return ticketHolders
  }

  async createTicketHolder(ticketHolderData) {
    const event = await eventsService.getOneEventById(ticketHolderData.eventId)
    if (event.isCanceled) {
      throw new Forbidden('Event is canceled, justin beiber had better things to do')
    }
    const ticketHolder = await dbContext.TicketHolders.create(ticketHolderData)
    await ticketHolder.populate('profile', 'name picture')
    await ticketHolder.populate('event')
    return ticketHolder
  }

}

export const ticketHoldersService = new TicketHoldersService()