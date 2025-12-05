var { MongoClient } = require("mongodb");

// Project DB & collection names (per sheet)
var DB_NAME = "myDB";
var COLLECTION_NAME = "myCollection";

var uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/" + DB_NAME;

var client = null;
var db = null;

async function connectToDb() {
  if (db) {
    return db;
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("MongoDB connected:", uri);
  return db;
}

async function getMainCollection() {
  var database = await connectToDb();
  return database.collection(COLLECTION_NAME);
}

module.exports = {
  connectToDb,
  getMainCollection
};
