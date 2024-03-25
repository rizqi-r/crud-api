const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
    host: "localhost",
    database: "crudapi",
    user: "postgres",
    password: "root",
    port: 5432
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.get("/", (req, res) => {
    pool.query("SELECT * FROM movies", (err, result) => {
        if (!err) {
            if (result.rows) {
                return res.json({
                    status: 200,
                    message: "OK"
                });
            } else {
                return res.json({
                    status: 204,
                    message: "No Content"
                });
            }
        } else {
            return res.json({
                status: 500,
                rows: err.message
            });
        }
    });
});

app.get("/v1/movies", (req, res) => {
    pool.query("SELECT * FROM movies", (err, result) => {
        if (!err) {
            return res.json({
                status: 200,
                rows: result.rows
            });
        } else {
            return res.json({
                status: 500,
                rows: err.message
            });
        }
    });
});

app.get("/v1/movies/:id", (req, res) => {
    const params = Number(req.params.id);
    if (params) {
        pool.query("SELECT * FROM movies WHERE id=$1", [params], (err, query) => {
            if (!err) {
                return res.json({
                    status: 200,
                    rows: query.rows
                });
            } else {
                return res.json({
                    status: 500,
                    rows: err.message
                });
            }
        });
    } else {
        return res.json({
            status: 500,
            message: "Error"
        });
    }
});

app.post("/v1/movies", (req, res) => {
    const body = req.body;
    if (body) {
        pool.query("INSERT INTO movies (title, director, release_year, is_available) VALUES ($1, $2, $3, $4)", [body.title, body.director, Number(body.release_year), body.is_available], (err, query) => {
            if (!err) {
                return res.json({
                    status: 200,
                    message: "Data Berhasil Dibuat"
                });
            } else {
                return res.json({
                    status: 500,
                    rows: err.message
                });
            }
        });
    } else {
        return res.json({
            status: 500,
            message: "Error"
        });
    }
});

app.put("/v1/movies/:id", (req, res) => {
    const params = Number(req.params.id);
    const body = req.body;
    if (body && params) {
        pool.query("UPDATE movies SET title=$1, director=$2, release_year=$3, is_available=$4 WHERE id=$5", [body.title, body.director, Number(body.release_year), body.is_available, params], (err, query) => {
            if (!err) {
                pool.query("SELECT * FROM movies WHERE id=$1", [params], (err, query) => {
                    return res.json({
                        status: 200,
                        message: "Data Berhasil Diupdate",
                        rows: query.rows
                    });
                });
            } else {
                return res.json({
                    status: 500,
                    rows: err.message
                });
            }
        });
    } else {
        return res.json({
            status: 500,
            message: "Error"
        });
    }
});

app.delete("/v1/movies/:id", (req, res) => {
    const params = Number(req.params.id);
    if (params) {
        pool.query("DELETE FROM movies WHERE id=$1", [params], (err, query) => {
            if (!err) {
                return res.json({
                    status: 200,
                    message: "Data Berhasil Dihapus"
                });
            } else {
                return res.json({
                    status: 404,
                    message: "Not Found"
                });
            }
        });
    } else {
        return res.json({
            status: 500,
            message: "Error"
        });
    }
});