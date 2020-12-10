require("dotenv").config();
const express = require("express");
const Axios = require("axios");

const server = express();
const PORT = process.env.PORT || 8080;
const apiUrl = "https://api.coingecko.com/api/v3/";

server.get("/", async (req, res) => {
  const { data: result } = await Axios.get(
    `${apiUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  return res.json({
    result: result.map(({ id, name, current_price, last_updated }) => ({
      id,
      name,
      current_price: `$${current_price}`,
      last_updated,
    })),
  });
});

server.get("/:id", async (req, res) => {
  const { data: result } = await Axios.get(`${apiUrl}/coins/bitcoin`);
  const { id, name, tickers } = result;
  const { last: last_price } = tickers[0];

  return res.json({
    id,
    name,
    last_price: `$${last_price}`,
  });
});

server.get("/ping", async (req, res) => {
  const { data: result } = await Axios.get(`${apiUrl}/ping`);

  return res.status(200).json({ result });
});

server.listen(PORT, () => console.log(`Server is on http://localhost:${PORT}`));
