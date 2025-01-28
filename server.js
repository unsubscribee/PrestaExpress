const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json());

app.post('/save-email', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: 'El campo email es requerido' });
    }

    // Guardar el correo en el archivo emails.txt
    fs.appendFile('emails.txt', email + '\n', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se pudo guardar el email' });
        }
        res.status(200).json({ message: 'Email guardado exitosamente' });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
