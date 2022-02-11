import { MongoClient } from 'mongodb';

export default {
  db: async () => {
    const client = await new MongoClient(process.env.DATABASE_URL!).connect();
    return client.db(process.env.DATABASE_NAME!);
  },
};
