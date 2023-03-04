import { Schema } from "mongoose";

const defaultSchemaOptions = { timestamps: true, toJSON: { virtuals: true } }
const basicStringType = { type: String, required: true, minLength: 3, maxLength: 500 }

export const CommentSchema = new Schema({

  body: { ...basicStringType, maxLength: 5000, },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, defaultSchemaOptions)

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

CommentSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})