import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from "../models/Ticket"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyEvents(){
    try {
      const res = await api.get('/account/tickets')
      AppState.myTickets = new Ticket(res.data)
    }
    catch(error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
