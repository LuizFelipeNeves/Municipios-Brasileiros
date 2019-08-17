require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");
const Location = require("./Location");
const municipios = JSON.parse(fs.readFileSync("../src/final.json"));

mongoose.connect(process.env.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true
});

municipios.map(e =>
  Location.create(e, err => {
    if (err) console.error(err);
    console.log(e.city);
  })
);
