const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const app = express();
app.use(cors());

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Referer': 'https://www.nseindia.com/',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive'
};

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar }));

app.get('/api/allIndices', async (req, res) => {
  try {
    await client.get('https://www.nseindia.com', { headers });
    // Wait 1 second before next request
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await client.get('https://www.nseindia.com/api/allIndices', { headers });
    res.json(response.data);
  } catch (err) {
    console.error('NSE fetch error:', err?.response?.status, err?.response?.data);
    res.status(500).json({ error: 'Failed to fetch indices', details: err?.response?.data });
  }
});

app.get('/api/option-chain-indices', async (req, res) => {
  const symbol = req.query.symbol;
  try {
    await client.get('https://www.nseindia.com', { headers });
    const response = await client.get(`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`, { headers });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch option chain' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('NSE proxy running'));