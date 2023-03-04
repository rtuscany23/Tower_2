import { Profile } from "./Account.js"

export class TicketHolderProfile extends Profile {
  constructor (data) {
    super(data.profile)
    this.TicketId = data.id
  }
}