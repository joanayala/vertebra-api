const { response } = require('express');
const { dbConnection } = require('../../database/config');

const { generateJWT } = require('../shared/helpers/jwt');

//List all logs
const getLogs = async (req, res) => {
    try {
        const listLogs = await dbConnection.query('select * from logs order by datetime desc');

        res.status(200).json({
            status: 200,
            logs: listLogs.rows,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Error listing logs',
        });
    }
};

//List specific log
const getLogs2 = async (req, res) => {
    const act_query = req.query.q;
    try {
        const listLogs = await dbConnection.query('select * from logs where action = $1::text', [act_query]);

        res.status(200).json({
            status: 200,
            logs: listLogs.rows,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Error listing logs',
        });
    }
};



module.exports = {
    getLogs,
    getLogs2,
};