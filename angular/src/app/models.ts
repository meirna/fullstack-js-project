export class Event {
  constructor(
    public name: string,
    public datetime: Date,
    public address: string,
    public city: string,
    public description: string,
    public image?: string,
    public comments?: Comment[],
    public _id?: string
  ) {}
}

export class Comment {
  constructor(
    public username: string,
    public eventId: string,
    public timestamp: Date,
    public text: string,
    public _id?: string
  ) {}
}

export class Message {
  constructor(
    public sender: User,
    public recipient: User,
    public timestamp: Date,
    public text: string,
    public _id?: string
  ) {}
}

export class User {
  constructor(
    public username: string,
    public password?: string,
    public name?: string,
    public email?: string,
    public _id?: string
  ) {}
}
