import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
  async createComment(commentData) {
    // Get comment
    const event = await eventsService.getOneEventById(commentData.eventId)
    // Check if the event is canceled and throw an error
    if (event.isCanceled) {
      throw new Forbidden('Event is canceled loser 🔒')
    }
    const comment = await dbContext.Comments.create(commentData)
    // NOTE you only have to drop a line to populate on creates!
    await comment.populate('creator', 'name comment')
    return comment
  }

}

export const commentsService = new CommentsService()