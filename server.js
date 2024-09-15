const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Wilmar',  // Cambia esto por tu usuario de MySQL
    password: 'Wilmar12345',  // Cambia esto por tu contraseña de MySQL
    database: 'registro_usuarios'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un usuario
app.post('/api/registro', (req, res) => {
    const { nombre, apellido, direccion, email, password } = req.body;
    
    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO usuarios (nombre, apellido, direccion, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, direccion, email, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al registrar el usuario' });
        } else {
            res.json({ mensaje: 'Usuario registrado con éxito' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

