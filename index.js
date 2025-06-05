const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes')
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api', categoriesRoutes);
app.use('/api', tablesRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});