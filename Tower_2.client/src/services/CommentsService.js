import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class CommentsService {

  async getComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }


async createComment(formData) {
  const res = await api.post('/api/comments', formData)
AppState.comments.unshift(res.data)
}


async deleteComment(commentId) {
    try {
      const res = await api.delete(`/api/comments/${commentId}`)
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