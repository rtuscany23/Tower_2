import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"
import { BadRequest} from "../utils/Errors.js"

class CommentsService {
  async createComment(commentData) {
    // Get comment
    const event = await eventsService.getOneEventById(commentData.eventId)
    // Check if the event is canceled and throw an error
    if (event.isCanceled) {
      // throw new Forbidden('Event is canceled loser 🔒')
    }
    const comment = await dbContext.Comments.create(commentData)
    // NOTE you only have to drop a line to populate on creates!
    await comment.populate('creator','name picture')
    return comment
  }

    async deleteComment(commentId) {
    const deletedComment = await dbContext.Comments.findByIdAndDelete(commentId)
    if (!deletedComment) {
      throw new BadRequest('Invalid comment ID')
    }
    return deletedComment
  }

}

export const commentsService = new CommentsService()