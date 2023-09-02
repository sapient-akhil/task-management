const mongoose = require("mongoose");
require("dotenv").config();

function mongoConnection() {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("mongoDB is connected..")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = mongoConnection();