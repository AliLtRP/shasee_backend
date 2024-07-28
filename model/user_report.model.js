const { client } = require("../db/database");
const { createReport, getReportByVin } = require("./report.modle");

async function getUserReport(req, res) {
    const { user_id } = req.query;

    console.log(user_id);

    try {
        const query = `SELECT * FROM "user_report" WHERE user_id=$1`;
        const values = [user_id];
        const result = await client.query(query, values);

        return res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            data: e
        });
    }
}

async function getAllUserReport(req, res) {
    const { user_id, report_id } = req.query;

    try {
        const query = `SELECT u.* FROM "user_report" as u
                        JOIN report as r ON u.report_id = r.id
                        WHERE u.user_id=$1, u.report_id = $2`;

        const values = [user_id, report_id];
        const result = await client.query(query, values);

        return res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            data: e
        });
    }
}

async function createUserReport(req, res) {
    const { user_id, report } = req.body;

    try {
        const reportSave = `INSERT INTO "report" (vin, data)
                            VALUES ($1, $2) RETURNING *;`;


        const reportValues = [report.vin, report];
        const reportResult = await client.query(reportSave, reportValues);

        const query = `INSERT INTO "user_report (user_id, report_id)" 
                       VALUES ($1, $2)
                       RETURNING *;`;

        const values = [user_id, reportResult.data.id];
        const result = await client.query(query, values);

        return res.status(200).send({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            data: e
        });
    }
}


module.exports = { getUserReport }