import { Schema } from "mongoose";

const defaultSchemaOptions = { timestamps: true, toJSON: { virtuals: true } }
const basicStringType = { type: String, required: true, minLength: 3, maxLength: 500 }
export const EventSchema = new Schema({

  name: {type: String, required: true},
  type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'], default: 'concert' },
  coverImg: { ...basicStringType, maxLength: 5000 },
  isCanceled: { type: Boolean, default: false, required: true },
  description: {...basicStringType, maxLength: 5000},
  location: {...basicStringType},
  capacity: {type: Number},
  startDate: {type: Date},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, defaultSchemaOptions)
 
EventSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})



