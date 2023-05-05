const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;
// var db;
// async function getData() {
//   let result = await client.connect();
//   db = result.db("users");
//   let collection  = db.collection('users')
// };

// getData()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

