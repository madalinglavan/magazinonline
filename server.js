const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors()); // Permite CORS

// Servirea fișierelor statice, inclusiv imagini
app.use('/images', express.static(path.join(__dirname, 'images')));

// Produse simulate
const products = [
  { id: 1, name: 'Telefon iPhone', price: 2000, category: 'telefoane', image: '/images/iphone.jpg' },
  { id: 2, name: 'Telefon Samsung', price: 1500, category: 'telefoane', image: '/images/samsung.jpg' },
  { id: 3, name: 'Laptop Dell', price: 3000, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 4, name: 'Laptop HP', price: 3500, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 5, name: 'Tabletă iPad', price: 1200, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 6, name: 'Tabletă Samsung', price: 1000, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 7, name: 'Telefon iPhone', price: 2000, category: 'telefoane', image: '/images/iphone.jpg' },
  { id: 8, name: 'Telefon Samsung', price: 1500, category: 'telefoane', image: '/images/samsung.jpg' },
  { id: 9, name: 'Laptop Dell', price: 3000, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 10, name: 'Laptop HP', price: 3500, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 11, name: 'Tabletă iPad', price: 1200, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 12, name: 'Tabletă Samsung', price: 1000, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 13, name: 'Telefon iPhone', price: 2000, category: 'telefoane', image: '/images/iphone.jpg' },
  { id: 14, name: 'Telefon Samsung', price: 1500, category: 'telefoane', image: '/images/samsung.jpg' },
  { id: 15, name: 'Laptop Dell', price: 3000, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 16, name: 'Laptop HP', price: 3500, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 17, name: 'Tabletă iPad', price: 1200, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 18, name: 'Tabletă Samsung', price: 1000, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 19, name: 'Telefon iPhone', price: 2000, category: 'telefoane', image: '/images/iphone.jpg' },
  { id: 20, name: 'Telefon Samsung', price: 1500, category: 'telefoane', image: '/images/samsung.jpg' },
  { id: 21, name: 'Laptop Dell', price: 3000, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 22, name: 'Laptop HP', price: 3500, category: 'laptopuri', image: '/images/laptop.jpg' },
  { id: 23, name: 'Tabletă iPad', price: 1200, category: 'tablete', image: '/images/laptop.jpg' },
  { id: 24, name: 'Tabletă Samsung', price: 1000, category: 'tablete', image: '/images/laptop.jpg' }
];

// Rute pentru produse
app.get('/api/products', (req, res) => {
  res.json(products); // Returnează toate produsele
});

app.get('/api/products/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category);

  if (filteredProducts.length > 0) {
    res.json(filteredProducts); // Returnează produsele din categoria selectată
  } else {
    res.status(404).json({ error: 'Nu există produse în această categorie' }); // Mesaj de eroare
  }
});

// Ruta pentru detalii produs
app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product); // Răspunde cu produsul în format JSON
  } else {
    res.status(404).send('Produsul nu a fost găsit');
  }
});

app.listen(port, () => {
  console.log(`Serverul rulează la http://localhost:${port}`);
});
