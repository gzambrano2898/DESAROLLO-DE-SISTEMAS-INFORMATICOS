const pool = require("../config/db");


//GET /tickets
const obtenerTickets = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM tickets ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json(error);

    }

};

//GET /tickets/:id
const obtenerTicket = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM tickets WHERE id=$1",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });

        }

        res.json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json(error);

    }

};

//POST /tickets
const crearTicket = async (req, res) => {

    try {

        const {

            titulo,
            descripcion,
            categoria,
            prioridad,
            estado

        } = req.body;

        const resultado = await pool.query(

            `INSERT INTO tickets
            (titulo,descripcion,categoria,prioridad,estado)

            VALUES($1,$2,$3,$4,$5)

            RETURNING *`,

            [

                titulo,
                descripcion,
                categoria,
                prioridad,
                estado

            ]

        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json(error);

    }

};


//PUT /tickets/:id
const actualizarTicket = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            titulo,
            descripcion,
            categoria,
            prioridad,
            estado

        } = req.body;

        const resultado = await pool.query(

            `UPDATE tickets

            SET

            titulo=$1,

            descripcion=$2,

            categoria=$3,

            prioridad=$4,

            estado=$5

            WHERE id=$6

            RETURNING *`,

            [

                titulo,
                descripcion,
                categoria,
                prioridad,
                estado,
                id

            ]

        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });

        }

        res.json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json(error);

    }

};

//DELETE /tickets/:id
const eliminarTicket = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(

            "DELETE FROM tickets WHERE id=$1 RETURNING *",

            [id]

        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });

        }

        res.json({

            mensaje: "Ticket eliminado correctamente"

        });

    } catch (error) {

        res.status(500).json(error);

    }

};

module.exports = {

    obtenerTickets,

    obtenerTicket,

    crearTicket,

    actualizarTicket,

    eliminarTicket

};