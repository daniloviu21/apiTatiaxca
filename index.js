const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes');
const statusRoutes = require('./routes/statusRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api', categoriesRoutes);
app.use('/api', tablesRoutes);
app.use('/api', statusRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});