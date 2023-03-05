import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class CommentsService {

  async getComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`)
    logger.log('getting comments', res.data)
    // /api/events/{{eventId}}/comments
    AppState.comments = res.data.map(c => new Comment(c))
  }


async createComment(formData) {
  const res = await api.post('/api/comments', formData)
  const newComment = new Comment(res.data)
  logger.log('creating comment', res.data)
  AppState.comments.unshift(newComment)
}


async deleteComment(commentId) {
    try {
      logger.log('commentId to delete', commentId)
      const res = await api.delete(`/api/comments/${commentId}`)
      logger.log('deleting comment', res.data)
      const index = AppState.comments.findIndex(c => c.id == commentId)
      if (index !== -1) {
        AppState.comments.splice(index, 1)
      }
    } catch (error) {
      logger.error(error)
    }
  }


}

export const commentsService = new CommentsService()