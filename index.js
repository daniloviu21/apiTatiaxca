const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes');
const statusRoutes = require('./routes/statusRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const suppliesRoutes = require('./routes/suppliesRoutes');
const menuIngredientsController = require('./routes/menuIngredientsRoutes');
const menuSuppliesController = require('./routes/menuSuppliesRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.use('/api', categoriesRoutes);
app.use('/api', tablesRoutes);
app.use('/api', statusRoutes);
app.use('/api', rolesRoutes);
app.use('/api', ingredientsRoutes);
app.use('/api', usersRoutes);
app.use('/api', employeesRoutes);
app.use('/api', suppliesRoutes);
app.use('/api', menuIngredientsController);
app.use('/api', menuSuppliesController);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});