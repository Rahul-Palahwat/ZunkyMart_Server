// const mongoose = require('mongoose');
// require('dotenv').config()
// // const mongoURI = process.env.MONGO_URI

// const connectToMongo = async () => {
//     // mongoose.connect(mongoURI, () => {
//     //     console.log(`Connected to mongo successfully`);
//     // })
//     // mongoose.connect(mongoURI).then(() => {
//     //     console.log('MongoDB connected!!');
//     // }).catch(err => {
//     //     console.log('Failed to connect to MongoDB', err);
//     // });

//     const client = await mongoose.connect(mongoURI).catch(err => { console.log(err); });
//     if (!client) {
//         return;
//     }
//     else{
//         console.log('Connected to mongo successfully!')
//     }
// }

// module.exports = connectToMongo;

const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/bigMart";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log(`Connected to mongo successfully`);
  });
};

module.exports = connectToMongo;
