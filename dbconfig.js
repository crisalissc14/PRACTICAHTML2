const sql = require('mssql');

const config = {
    user: 'tu_usuario', // Reemplaza con tu usuario de SQL Server
    password: 'tu_contraseña', // Reemplaza con tu contraseña de SQL Server
    server: 'DESKTOP-KVHIEJJ\\SQLEXPRESS', // Nombre del servidor
    database: 'tu_base_de_datos', // Reemplaza con el nombre de tu base de datos
    options: {
        encrypt: false, // Si estás usando SQL Server en modo local, establece esto en false
        enableArithAbort: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}

async function testConnection() {
    try {
        await sql.connect(config);
        console.log('Conexión a la base de datos exitosa');
    } catch (err) {
        console.error('Error en la prueba de conexión', err);
    }
}

async function verifyTable() {
    try {
        const result = await sql.query`SELECT * FROM Productos`;
        console.log('Tabla verificada', result);
    } catch (err) {
        console.error('Error al verificar la tabla', err);
    }
}

module.exports = {
    connectDB,
    testConnection,
    verifyTable,
    sql
};