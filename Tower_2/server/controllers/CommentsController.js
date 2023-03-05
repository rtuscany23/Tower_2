import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"

export class CommentsController extends BaseController {
  constructor () {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
  }

  async createComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  
async deleteComment(req, res, next) {
    try {
      const commentId = req.params.id
      const deletedComment = await commentsService.deleteComment(commentId)
      return res.send(deletedComment)
    } catch (error) {
      next(error)
    }
}

}
