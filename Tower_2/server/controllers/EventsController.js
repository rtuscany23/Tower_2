import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js"
import { ticketHoldersService } from "../services/TicketHoldersService.js"
// import { picturesService } from "../services/PicturesService.js"
import BaseController from "../utils/BaseController.js"

export class EventsController extends BaseController {
// FIXME move get comments by eventid from comments controller to here
  constructor () {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getOneEventById)
      .get('/:eventId/comments', this.getCommentsInEvent)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      // .delete('/:albumId', this.archiveAlbum)
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


  // async getPicturesInAlbum(req, res, next) {
  //   try {
  //     const albumId = req.params.albumId
  //     const pictures = await picturesService.getPicturesInAlbum(albumId)
  //     return res.send(pictures)
  //   } catch (error) {
  //     next(error)
  //   }
  // }



  // async archiveAlbum(req, res, next) {
  //   try {
  //     const albumId = req.params.albumId
  //     const requestorId = req.userInfo.id
  //     const album = await albumsService.archiveAlbum(albumId, requestorId)
  //     return res.send(album)
  //   } catch (error) {
  //     next(error)
  //   }
  // }



}