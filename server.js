const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Referer': 'https://www.nseindia.com/',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive'
};

app.get('/api/allIndices', async (req, res) => {
  try {
    const response = await axios.get('https://www.nseindia.com/api/allIndices', { headers });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch indices' });
  }
});

app.get('/api/option-chain-indices', async (req, res) => {
  const symbol = req.query.symbol;
  try {
    const response = await axios.get(`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`, { headers });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch option chain' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('NSE proxy running'));