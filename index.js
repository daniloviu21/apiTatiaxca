const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api', categoriesRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});