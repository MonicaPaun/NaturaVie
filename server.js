const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // pentru a citi variabilele de mediu (ex. cheia API)

const app = express();
const port = 3000;

// Middleware pentru a permite cereri de tip POST
app.use(express.json());

// Rute pentru a interacționa cu API-ul chatbot-ului
app.post('/api/chat', async (req, res) => {
  const message = req.body.message;

  // Cheia API citită din variabila de mediu
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch('https://api.chatbot.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    res.json(data);  // Trimite răspunsul înapoi către client
  } catch (error) {
    console.error('Eroare la comunicarea cu API-ul:', error);
    res.status(500).send('Eroare internă');
  }
});

// Pornește serverul pe portul 3000
app.listen(port, () => {
  console.log(`Serverul rulează pe http://localhost:${port}`);
});
