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
    public image?: string,
    public comments?: Comment[],
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
    public username: string = '',
    public eventId: string = '',
    public timestamp: Date = new Date(0),
    public text: string = '',
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
    public sender: User | null = null,
    public recipient: User | null = null,
    public timestamp: Date = new Date(0),
    public text: string = '',
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
