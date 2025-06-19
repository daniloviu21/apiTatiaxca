const cloudinary = require('./config/cloudinary');

async function testConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log('Conexión exitosa a Cloudinary', result);
  } catch (error) {
    console.error('Error al conectar a Cloudinary', error);
  }
}

testConnection();
