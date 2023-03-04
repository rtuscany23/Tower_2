import { Schema } from "mongoose";

const defaultSchemaOptions = { timestamps: true, toJSON: { virtuals: true } }

export const TicketHolderSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, defaultSchemaOptions)


TicketHolderSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketHolderSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

TicketHolderSchema.index({ eventId: 1, accountId: 1 }, { unique: true })