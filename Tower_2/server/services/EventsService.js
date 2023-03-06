import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {

  async editEventCapacity(eventId, addAbs){
    const event = await this.getOneEventById(eventId)
    event.capacity += addAbs
    await event.save()
    return event
  }
  async cancelEvent(eventId, requestorId) {
   const event = await this.getOneEventById(eventId)
   if (event.creatorId.toString() != requestorId) {
      throw new Forbidden('You aren\'t allowed to shut down someone elses event bro! ')
      }
    event.isCanceled = true
    await event.save()
    return event
  }
    async getCommentsInEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator','name picture')
    return comments
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator','name picture')
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find()
      .populate('creator', 'name picture')
      // .populate('albumMemberCount')
    return events
  }

  async getOneEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  



}


export const eventsService = new EventsService()
