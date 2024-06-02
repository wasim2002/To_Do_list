const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getAll', (req, res) => {
    let query = `select * from first`
    db.query(query, (err, result) => {
        if (err) {
            return res.json({ data: err.message })
        } else {
            res.json({ data: result })
        }
    })
});

app.post('/addTodo', (req, res) => {
    let body = req.body;
    let query = `insert into first(todo) values ('${body.todo}')`;
    db.query(query, (result, err) => {
        if (err) {
            return res.json({ data: err.message });
        } else {
            res.json({ data: result })
        }
    })
});

app.delete('/deleteTodo', (req, res) => {
    let id = req.body.id
    let query = `delete from first where id=${id}`;
    db.query(query, (err, result) => {
        if (err) {
            return res.json({ data: err.message })
        } else {
            res.json({ data: result })
        };
    });
});

app.post('/editTodo', (req, res) => {
    let newTodo = req.body;
    if (newTodo.todo) {
        let query = `UPDATE first SET todo="${newTodo.todo}" WHERE id=${newTodo.id}`;
        db.query(query, (err, result) => {
            if (err) {
                return res.json({ data: err.message })
            } else {
                res.json({ data: result })
            };
        });
    } else {
        let query = `UPDATE first SET checked="${newTodo.checked}" WHERE id=${newTodo.id}`;
        db.query(query, (err, result) => {
            if (err) {
                return res.json({ data: err.message })
            } else {
                res.json({ data: result })
            };
        });
    };
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});