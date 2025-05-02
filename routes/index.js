const express = require('express');
const router = express.Router();

//Rota principal do index.js
router.get('/', (req, res) => {
  res.send('Página inicial');
});

//Exporta o router.
module.exports = router;