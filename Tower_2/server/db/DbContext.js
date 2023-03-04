import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event.js';
import { TicketHolderSchema } from "../models/TicketHolder.js";
import { ValueSchema } from '../models/Value';
import { CommentSchema } from "../models/Comment.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', EventSchema);

  TicketHolders = mongoose.model('TicketHolder', TicketHolderSchema);
  Comments = mongoose.model('Comment',CommentSchema);
}

export const dbContext = new DbContext()
