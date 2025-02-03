const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectDB, testConnection, verifyTable, sql } = require('./dbconfig');

const app = express();
const port = process.env.PORT || 3001;

// Conectar a la base de datos
connectDB();

// Probar la conexión a la base de datos
testConnection();

// Verificar la tabla
verifyTable();

// Configurar middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'Img')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'Secciones')));
app.use(bodyParser.json());

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'Productos.html'));
});

// Ruta para la página de productos
app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'Productos.html'));
});

// Ruta para la página del carrito
app.get('/carrito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'carrito.html'));
});

// Ruta para la página de Acerca de
app.get('/Acercade.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'Acercade.html'));
});

// Ruta para la página de Contacto
app.get('/Contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'Contacto.html'));
});

// Ruta para la página de Sucursales
app.get('/Sucursales.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Secciones', 'Sucursales.html'));
});

// Ruta para obtener productos desde la base de datos
app.get('/api/productos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Productos`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener productos', err);
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta para insertar productos en la base de datos
app.post('/api/productos', async (req, res) => {
    const { nombre, precio, descripcion, imagen } = req.body;
    try {
        const result = await sql.query`INSERT INTO Productos (Nombre, Precio, Descripcion, Imagen) VALUES (${nombre}, ${precio}, ${descripcion}, ${imagen})`;
        res.status(201).send('Producto insertado correctamente');
    } catch (err) {
        console.error('Error al insertar producto', err);
        res.status(500).send('Error al insertar producto');
    }
});

// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Manejar el cierre del servidor y la base de datos
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Servidor cerrado');
        sql.close();
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Servidor cerrado');
        sql.close();
    });
});