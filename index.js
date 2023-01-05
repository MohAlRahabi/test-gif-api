const express = require("express");
const axios = require("axios").default;
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3500;

app.use(cors());

app.get("/get_gifs", async (req, res) => {
  //prepareing the full url
  var keyword = req.query.q,
    limit = req.query.limit,
    offset = req.query.offset,
    api_key = process.env.GIF_API_KEY,
    endpoint = process.env.GIF_ENDPOINT;

  var final_url = `${endpoint}?api_key=${api_key}&q=${keyword}&limit=${limit}&offset=${offset}`;

  var result = await getGifs(final_url);
  return res.send(result).status(result == null ? 500 : 200);
});

const getGifs = async (final_url) => {
  const result = await axios.get(final_url);
  if (result.status === 200) return result.data;
  return null;
};

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
