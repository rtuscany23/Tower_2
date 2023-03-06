import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketHoldersService } from "../services/TicketHoldersService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getEventsByUserId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
    async getEventsByUserId(res, req, next){
    try {
      const accountId = req.userInfo.id
      const events = await ticketHoldersService.getEventsByUserId(accountId)
      return res.send(events)
    }
    catch(error) {
      console.error(error)
      next(error)
    }
  }

}
