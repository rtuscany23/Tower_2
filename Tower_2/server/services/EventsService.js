import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {

    async getCommentsInEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name comment')
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
