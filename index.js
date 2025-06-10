const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes');
const statusRoutes = require('./routes/statusRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api', categoriesRoutes);
app.use('/api', tablesRoutes);
app.use('/api', statusRoutes);
app.use('/api', rolesRoutes);
app.use('/api', ingredientsRoutes);
app.use('/app', usersRoutes);
app.use('/app', employeesRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  
});