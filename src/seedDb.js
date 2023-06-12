const { configDotenv } = require('dotenv');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/userModel');
configDotenv();

const randomNextDate = (min, max) => {
  const oneDay = 86400000;
  const randomNumDays =  Math.floor(Math.random() * (max - min + 1) + min);
  return oneDay * randomNumDays;
};
const cycleMaker = (qty) => {
  const allDates = [];
  const now = new Date();

  let nextRangeStart = now.valueOf();
  let count = qty;
  let document;

  while (--count > -1) {
    document = {};
    document.cycle = {};
    document._id = new Date(nextRangeStart);

    let { cycle } = document;
    cycle.fStart = new Date(nextRangeStart);
    cycle.fEnd = new Date(cycle.fStart.valueOf() + randomNextDate(2, 3));
    cycle.pStart = new Date(cycle.fEnd.valueOf() + randomNextDate(1, 3));
    cycle.pEnd = new Date(cycle.pStart.valueOf() + randomNextDate(2, 4));
    cycle.mStart = new Date(cycle.pEnd.valueOf() + randomNextDate(1, 2));
    cycle.mEnd = new Date(cycle.mStart.valueOf() + randomNextDate(2, 4));

    nextRangeStart += randomNextDate(20, 35);
    allDates.push(document);
  }
  return allDates;
};
const makeDB = async (numUsers) => {
  let count  = -1;
  let dummyUser;

  while (++count < numUsers) {
    dummyUser = {
      firstName: names[count][0],
      lastName: names[count][1],
      phone: phones[count],
      email: emails[count],
      pic: picBuffer,
      address: {
        city: addresses[count].city,
        state: addresses[count].state,
        zip: addresses[count].zip,
      },
      dates: cycleMaker(Math.floor(Math.random() * 4 + 1)),
    }
    await User.create(dummyUser);
    console.log(`\n${names[count][0]} ${names[count][1]} was populated!`)
  }
console.log('\ndone...');
};

// NAMES, PHONES, EMAILS, ADDRESSES => length 10
// PICBUFFER => just 1
// DATES => assigned within makeDB
const names = [
  ['Emily', 'Johnson'],
  ['Olivia', 'Smith'],
  ['Ava', 'Brown'],
  ['Sophia', 'Davis'],
  ['Mia', 'Wilson'],
  ['Isabella', 'Taylor'],
  ['Charlotte', 'Anderson'],
  ['Amelia', 'Martinez'],
  ['Harper', 'Thompson'],
  ['Evelyn', 'Thomas'],
];
const phones = [
  '012-555-1234',
  '012-555-5678',
  '012-555-9012',
  '012-555-3456',
  '012-555-7890',
  '012-555-2345',
  '012-555-6789',
  '012-555-0123',
  '012-555-4567',
  '012-555-8901',
];
const emails = [
  'testEmail1@testMail.com',
  'testEmail2@testMail.com',
  'testEmail3@testMail.com',
  'testEmail4@testMail.com',
  'testEmail5@testMail.com',
  'testEmail6@testMail.com',
  'testEmail7@testMail.com',
  'testEmail8@testMail.com',
  'testEmail9@testMail.com',
  'testEmail10@testMail.com',
];
const addresses = [
  { city: "New York City", state: "New York", zip: 10001 },
  { city: "Los Angeles", state: "California", zip: 90001 },
  { city: "Chicago", state: "Illinois", zip: 60601 },
  { city: "Houston", state: "Texas", zip: 77001 },
  { city: "Philadelphia", state: "Pennsylvania", zip: 19019 },
  { city: "Phoenix", state: "Arizona", zip: 85001 },
  { city: "San Antonio", state: "Texas", zip: 78201 },
  { city: "San Diego", state: "California", zip: 92101 },
  { city: "Dallas", state: "Texas", zip: 75201 },
  { city: "San Jose", state: "California", zip: 95101 },
];
const picBuffer =
  fs.readFileSync('/Users/tjspitz/Pictures/ZoomPicsAndVids/botWatcher.png');

const { MONGO_HOST, MONGO_COLL } = process.env;
const MONGO_URI = `mongodb://${path.join(MONGO_HOST, MONGO_COLL)}`
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.once('open', () => {
  console.log(`db connected on ${MONGO_URI}`);
  console.log('\nAttempting to seed database...');
  makeDB(10);
});
db.on('error', () => {
  console.error(`error on db connection ${MONGO_URI}`);
});