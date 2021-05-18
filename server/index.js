const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const publicVapidKey =
  "BH-nSg8sAoMgB9c0qMdxW5-CgyF6piyPcnJjZD0eq6ELgQsdLrgBu5OLmlemeGABSs2r9U7nDN7vWJX3eVV42OE";

const privateVapidKey = "mPbUll_kJg_aAZr2oe8uA2-Lcp2x0XyYmgcP0gPOX9I";
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/notificacion", (req, res) => {
  const subcription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push test" });

  webpush
    .sendNotification(subcription, payload)
    .catch((err) => console.error(err));
});

app.get("/", (req, res) => {
  const prueba = "enviado";

  res.send({ message: prueba });
});

app.listen(process.env.PORT || 3500);
