const express = require('express');
const axios = require('axios');
const app = express();
const port = 5173;
const windowSize = 10;
let numbersStore = [];
const thirdPartyAPI = {
  p: 'https://example.com/prime', 
  f: 'https://example.com/fibonacci',
  e: 'https://example.com/even',
  r: 'https://example.com/random'
};

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(thirdPartyAPI[type], { timeout: 500 });
    return response.data.numbers; 
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
};

app.get('/numbers/:numberid', async (req, res) => {
  const numberId = req.params.numberid;

  if (!['p', 'f', 'e', 'r'].includes(numberId)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const newNumbers = await fetchNumbers(numberId);

  
  const uniqueNewNumbers = newNumbers.filter((num) => !numbersStore.includes(num));
  numbersStore = [...numbersStore, ...uniqueNewNumbers].slice(-windowSize);

  const avg = numbersStore.length ? (numbersStore.reduce((a, b) => a + b, 0) / numbersStore.length).toFixed(2) : 0;

  res.json({
    windowPrevState: numbersStore.slice(0, -uniqueNewNumbers.length),
    windowCurrState: numbersStore,
    numbers: newNumbers,
    avg: avg
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

