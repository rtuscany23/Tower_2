import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketHoldersService } from "../services/TicketHoldersService.js";

export class TicketsController extends BaseController {
  constructor () {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicketById)
  }

  async createTicket(req, res, next) {
    try {
      const ticketHolderData = req.body
      ticketHolderData.accountId = req.userInfo.id
      const ticketHolder = await ticketHoldersService.createTicketHolder(ticketHolderData)
      return res.send(ticketHolder)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicketById(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const requestorId = req.userInfo.id
      const message = await ticketHoldersService.deleteTicketById(ticketId, requestorId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}