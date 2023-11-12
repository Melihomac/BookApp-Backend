const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
var cors = require('cors');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/assets', express.static('/assets'));
// JSON dosyasının yolu
const jsonFilePath = 'data.json';

// GET isteğine yanıt verme
app.get('/api/data', (req, res) => {
  // JSON dosyasını oku
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // JSON dosyasındaki veriyi yanıt olarak gönder
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Sunucuyu dinleme
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

