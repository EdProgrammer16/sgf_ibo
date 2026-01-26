require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Header Authorization é obrigatório" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  
  if (!token || token !== process.env.API_KEY) {
    return res.status(403).json({ error: "Chave inválida" });
  }

  next();
};
