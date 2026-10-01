const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Base de datos simulada (en memoria)
let usuarios = [{ id: 1, nombre: "Ana", email: "ana@test.com" }];
let pedidos = [{ id: 1, usuarioId: 1, producto: "Laptop", cantidad: 1, estado: "Pendiente" }];

// Endpoint 1: Crear un pedido
app.post('/api/pedidos', (req, res) => {
    const { usuarioId, producto, cantidad } = req.body;
    if (!usuarioId || !producto || !cantidad) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const nuevoPedido = { id: pedidos.length + 1, usuarioId, producto, cantidad, estado: "Pendiente" };
    pedidos.push(nuevoPedido);
    res.status(200).json({ mensaje: "Pedido creado", pedido: nuevoPedido });
});

// Endpoint 2: Obtener pedidos de un usuario
app.get('/api/usuarios/:id/pedidos', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuarioId);
    res.status(200).json(pedidosUsuario);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});