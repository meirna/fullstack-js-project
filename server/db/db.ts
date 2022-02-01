import { MongoClient, Db } from 'mongodb';

export default {
  db: async () => {
    const client = await new MongoClient(process.env.DB_URL!).connect();
    return client.db(process.env.DB_NAME!);
  },
};
