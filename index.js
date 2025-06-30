const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes');
const statusRoutes = require('./routes/statusRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const suppliesRoutes = require('./routes/suppliesRoutes');
const menuIngredientsRoutes = require('./routes/menuIngredientsRoutes');
const menuSuppliesRoutes = require('./routes/menuSuppliesRoutes');
const menuRoutes = require('./routes/menuRoutes');
const detailOrdersRoutes = require('./routes/detailOrdersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const orderDetailsRoutes = require('./routes/orderDetails');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

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
app.use('/api', menuIngredientsRoutes);
app.use('/api', menuSuppliesRoutes);
app.use('/api', menuRoutes);
app.use('/api', detailOrdersRoutes);
app.use('/api', ordersRoutes);
app.use('/api', orderDetailsRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});