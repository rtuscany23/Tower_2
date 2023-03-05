export class Comment{
  constructor(data) {
    this.commentId = data._id;
    this.eventId = data.eventId;
    this.creatorId = data.creatorId;
    this.body = data.body;
    this.creator = data.creator;
  }  
}

// import { Profile } from "./Account.js"
// export class Comment extends Profile {
//   constructor (data) {
//     super(data.profile)
//     this.commentId = data._id;
//     this.eventId = data.eventId;
//     this.creatorId = data.creatorId;
//     this.body = data.body;
//   }
// }

// import { Profile } from "./Account.js"
// export class Comment extends Profile {
//   constructor(data) {
//     super(data.profile)
//     this.commentId = data.id;
//     this.eventId = data.eventId;
//     this.creatorId = data.creatorId;
//     this.body = data.body;
//     this.creator = data.creator;
//   }  
// }


