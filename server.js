require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cr_seg_ind';
const productRoutes = require('./routes/products');


// Conectar a MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

// Middleware básico
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
