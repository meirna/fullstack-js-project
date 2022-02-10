export class Event {
  constructor(
    public name?: string,
    public datetime?: Date | string,
    public city?: string,
    public address?: string,
    public description?: string,
    public image?: string,
    public comments?: Comment[],
    public user?: User,
    public _id?: string
  ) {}
}

export class Comment {
  constructor(
    public eventId: string,
    public text: string,
    public user?: User,
    public timestamp?: Date,
    public _id?: string
  ) {}
}

export class Message {
  constructor(
    public user?: User,
    public recipient?: User,
    public text?: string,
    public timestamp?: Date,
    public _id?: string
  ) {}
}

export class User {
  constructor(
    public username?: string,
    public password?: string,
    public image?: string,
    public name?: string,
    public email?: string,
    public _id?: string
  ) {}
}
