const { client } = require('../db/database');


async function createSub(req, res) {
    const { id } = req.body;

    const query =  `INSERT INTO "sub" (type, price, start_date, end_date, user_id, status)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    try {

        const value = ["standard", "5", startDate, endDate, id, true];

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


async function getSub(req, res) {
    const { id } = req.query;

    const query =  `SELECT * FROM "sub" WHERE user_id = $1`;

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


async function updateSub(req, res) {
    const { id } = req.query; // sub id
    const { type, price, start_date, end_date, status, user_id } = req.body; //update

    const query =  `UPDATE "sub"
                    SET type=$1,
                        price=$2,
                        start_date=$3,
                        end_date=$4,
                        user_id=$5,
                        status=$6,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $7
                    RETURNING *;`;

    try {
        const value = [type, price, start_date, end_date, user_id, status, id];

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

async function deleteSub(req, res) {
    const { id } = req.query; // subscription id

    const query =  `UPDATE "sub"
                    SET status=$1,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $2
                    RETURNING *;`;

    try {
        const value = [false, id];

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

module.exports = { createSub, getSub, updateSub, deleteSub }