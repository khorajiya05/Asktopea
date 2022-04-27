const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/Asktopeaa")
    .then((res) => console.log("mongdb is connected successfully"))
    .catch((err) => console.log("Error", err));
};
