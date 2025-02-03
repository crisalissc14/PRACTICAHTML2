const sql = require('mssql');

const config = {
    user: '', // Déjalo vacío si usas autenticación de Windows
    password: '', // Déjalo vacío si usas autenticación de Windows
    server: 'DESKTOP-KVHIEJJ\\SQLEXPRESS', // Usa el nombre correcto de la instancia
    database: 'PizzaDB',
    options: {
        encrypt: false, // No es necesario si es local
        enableArithAbort: true,
        trustServerCertificate: true // Agregar si hay problemas con SSL
    },
    port: 1433 // Asegúrate de que usa el puerto correcto
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Conexión a la base de datos exitosa');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
};

const testConnection = async () => {
    try {
        const result = await sql.query`SELECT 1 AS test`;
        console.log('Prueba de conexión exitosa:', result.recordset);
    } catch (err) {
        console.error('Error en la prueba de conexión', err);
    }
};

const verifyTable = async () => {
    try {
        const result = await sql.query`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Productos' AND xtype='U') CREATE TABLE Productos (Id INT PRIMARY KEY IDENTITY, Nombre NVARCHAR(50), Precio DECIMAL(10, 2), Descripcion NVARCHAR(255), Imagen NVARCHAR(255))`;
        console.log('Verificación de tabla exitosa');
    } catch (err) {
        console.error('Error al verificar la tabla', err);
    }
};

module.exports = {
    connectDB,
    testConnection,
    verifyTable,
    sql
};