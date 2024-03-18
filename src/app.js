require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const checkAuth = require('./middleware/checkAuth');

const app = express();
const cors = require('cors');

app.use(cors());


app.use(express.json());

app.use('/api/products',checkAuth, productRoutes);

app.use('/api/users', userRoutes);

// Middleware de Errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;