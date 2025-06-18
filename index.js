const express = require('express');
const categoriesRoutes = require('./routes/categoriesRoutes');
const tablesRoutes = require('./routes/tablesRoutes');
const statusRoutes = require('./routes/statusRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db'); 
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
app.use('/app', usersRoutes);
app.use('/app', employeesRoutes);

const PORT = process.env.PORT || 3010;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión exitosa. Hora del servidor PostgreSQL:', res.rows[0].now);
  }
});

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);  

});