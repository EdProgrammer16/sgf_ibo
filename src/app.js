const express = require("express");
const parcelaRoutes = require("./routes/parcelaRoutes");
const processoRoutes = require("./routes/processoRoutes");
const auth = require("./middlewares/auth");

const app = express();
app.use(express.json());

// 🔐 Aqui o auth é "registrado"
// app.use(auth);

// Rotas
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use("/parcelas", parcelaRoutes);
app.use("/processos", processoRoutes);

module.exports = app;
