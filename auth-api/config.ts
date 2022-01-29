import mongoose from 'mongoose';

export default {
  getDbConnection: async () => {
    await mongoose.connect('mongodb://localhost:27017/njp-projekt');
    return mongoose.connection;
  },
  port: process.env.PORT || 8081,
  secret: 'lozinka987',
};