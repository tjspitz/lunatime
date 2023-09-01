import mongoose from 'mongoose';
import path from 'path';

const { MONGO_HOST, MONGO_COLL } = process.env;
const MONGO_URI = `mongodb://${path.join(MONGO_HOST, MONGO_COLL)}`;

export default async function mongo() {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`db connected at ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error(err);
    });
}
