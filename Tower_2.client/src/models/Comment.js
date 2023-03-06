export class Comment {
  constructor(data) {
    this.commentId = data.id;
    this.body = data.body;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.eventId = data.eventId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
  
}


