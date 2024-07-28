const { client } = require('../db/database');

async function createReport(req, res) {
    const { vin, report } = req.body;

    const query = `INSERT INTO "report" (vin, data)
                    VALUES ($1, $2) RETURNING *;`;

    try {
        const value = [vin, report];
        const result = await client.query(query, value);

        res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        res.status(501).send({
            success: false,
            data: e
        });
    }
}


async function getReport(req, res) {
    const { id } = req.query;

    const query = `SELECT * FROM "report" WHERE id = $1`;

    try {
        const value = [id];

        const result = await client.query(query, value);

        res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        res.status(501).send({
            success: false,
            data: e
        });
    }
}

async function getReportByVin(req, res) {
    const { vin } = req.query;

    const query = `SELECT * FROM "report" WHERE vin = $1`;

    try {
        const value = [vin];

        const result = await client.query(query, value);

        res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        res.status(501).send({
            success: false,
            data: e
        });
    }
}

async function updateReport(req, res) {
    const { id } = req.query; // report id
    const { vin, data } = req.body; //update

    const query = `UPDATE "report"
                    SET vin=$1,
                        data=$2,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $3
                    RETURNING *;`;

    try {
        const value = [vin, data, id];

        const result = await client.query(query, value);

        res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        res.status(501).send({
            success: false,
            data: e
        });
    }
}


module.exports = { createReport, getReport, updateReport, getReportByVin }