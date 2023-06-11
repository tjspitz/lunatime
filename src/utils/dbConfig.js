import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import path from'path';
configDotenv();

const { MONGO_HOST, MONGO_COLL } = process.env;
const MONGO_URI = `mongodb://${path.join(MONGO_HOST, MONGO_COLL)}`

mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.once('open', () => {
  console.log(`db connected on ${MONGO_URI}`);
});
db.on('error', () => {
  console.error(`error on db connection ${MONGO_URI}`);
});

export default db;
