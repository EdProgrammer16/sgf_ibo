require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

exports.getAll = async (req, res) => {
  const result = await sql`SELECT * FROM processos;`;
  
  res.json([...result]);
};

exports.getByNprocesso = async (req, res) => {
    const { n_processo } = req.params;
    const result = await sql`SELECT * FROM processos WHERE n_processo = ${n_processo}`;

    res.json([...result]);
}

exports.update = async (req, res) => {
    const { id } = req.params;

    const { tipo_processo, estado_processo } = req.body;

    // console.log("Updating processo with id:", id);
    // console.log("New tipo_processo:", tipo_processo);
    // console.log("New estado_processo:", estado_processo);

    const result = await sql` 
    UPDATE processos 
    SET tipo_processo = ${tipo_processo}, 
    estado_processo = ${estado_processo} 
    WHERE id = ${id}`;

    if (result) {
        const checkResult = await sql`SELECT * FROM processos WHERE id = ${id}`;
        res.json({
            status: true,
            message: `Processo with id ${id} updated successfully`,
            processo: checkResult[0]
        });
    } else {
        res.status(404).json({
            status: false,
            message: `Processo with id ${id} not found`
        });
    }
}

exports.create = async (req, res) => {
    const { 
        n_processo,
        tipo_processo,
        requerente,
        nif,
        estado_processo,
        data_inicio,
        data_fim,
        responsavel
    } = req.body;

    // console.log("Creating processo with data:", req.body);
    
    const result = await sql`
    INSERT INTO processos (n_processo, tipo_processo, requerente, nif, estado_processo, data_inicio, data_fim, responsavel) 
    VALUES (${n_processo}, ${tipo_processo}, ${requerente}, ${nif}, ${estado_processo}, ${data_inicio}, ${data_fim}, ${responsavel})
    RETURNING *;`;

    if (result) {
        // const checkResult = await sql`SELECT * FROM processos ORDER BY id DESC LIMIT 1`;
        res.status(201).json({
            status: true,
            message: "Processo created successfully",
            processo: result[0]
        });
    } else {
        res.status(500).json({
            status: false,
            message: "Error creating processo"
        });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    const result = await sql`DELETE FROM processos WHERE id = ${id}`;   
    res.json({
        status: true,
        message: `Processo with id ${id} deleted successfully`
    });
}