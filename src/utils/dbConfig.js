import mongoose from 'mongoose';

const { MONGO_URI } = process.env.local;

// mongoose.connect(process.env.MONGO_URI)
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.once('open', () => {
  console.log(`db connected on ${MONGO_URI}`);
});
db.on('error', () => {
  console.error(`error on db connection ${MONGO_URI}`);
});

export default db;
