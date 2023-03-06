import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js"
import { ticketHoldersService } from "../services/TicketHoldersService.js"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"

export class EventsController extends BaseController {
  constructor () {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getOneEventById)
      .get('/:eventId/comments', this.getCommentsInEvent)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .delete('/:eventId', this.cancelEvent)
      .put('/:eventId', this.editEventCapacity)
  }

  async editEventCapacity(res, req, next){
    try {
      const eventId = req.params.eventId
      const modifiedEvent = await eventsService.editEventCapacity(eventId, 0)
      return res.send(modifiedEvent)
    } catch (error) {
      next(error)
    }
  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const requestorId = req.userInfo.id
      const canceledEvent = await eventsService.cancelEvent(eventId, requestorId)
      return res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsInEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await eventsService.getCommentsInEvent(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id 
      const event = await eventsService.createEvent(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

    async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getOneEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getOneEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventTickets = await ticketHoldersService.getTicketsByEventId(eventId)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }


}
