/* eslint-disable import/first */
import dotenv from "dotenv";
import "./db";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

import app from "./app";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
