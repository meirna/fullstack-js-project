import { Collection, Document } from 'mongodb';

import mongo from './db';

export abstract class Model {
  abstract collection(): Promise<Collection<Document>>;
}

export class Event extends Model {
  constructor(
    public name: string = '',
    public datetime: Date = new Date(0),
    public city: string = '',
    public address: string = '',
    public description?: string,
    public image?: Image,
    public comments?: Comment[],
    public user?: User,
    public _id?: string
  ) {
    super();
  }

  async collection() {
    const db = await mongo.db();
    return db.collection('events');
  }
}

export class Comment extends Model {
  constructor(
    public user: User | null = null,
    public eventId: string = '',
    public text: string = '',
    public timestamp?: Date,
    public _id?: string
  ) {
    super();
  }

  async collection() {
    const db = await mongo.db();
    return db.collection('comments');
  }
}

export class Message extends Model {
  constructor(
    public user: User | null = null,
    public recipient: User | null = null,
    public text: string = '',
    public timestamp?: Date,
    public _id?: string
  ) {
    super();
  }

  async collection() {
    const db = await mongo.db();
    return db.collection('messages');
  }
}

export class User extends Model {
  constructor(
    public username: string = '',
    public password?: string,
    public salt?: string,
    public image?: string,
    public name?: string,
    public email?: string,
    public _id?: string
  ) {
    super();
  }

  async collection() {
    const db = await mongo.db();
    return db.collection('users');
  }
}

export class Image {
  constructor(public name?: string, public data?: string) {}
}
