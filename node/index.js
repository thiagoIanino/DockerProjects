const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'usuario',
    password: 'senha_do_usuario',
    database: 'nodedb'
};

const mysql = require('mysql');
app.use(express.json());

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    connection.query('SELECT name FROM people', (error, results, fields) => {
        if (error) {
            res.status(500).send('Erro ao consultar banco de dados');
        } else {    
            const html = `<h1>Full cycle rocks</h1> <ul>${results?.map(e => `<li>${e.name}</li>`)}</ul>`
            res.send(html);
        }
    });

    connection.end()
})

app.post('/', (req, res) => {

    const { name } = req.body;
    var people;
    const connection = mysql.createConnection(config);
    const insert = `INSERT INTO people (name) values ('${name}');`
    connection.query(insert)

    connection.query('SELECT name FROM people', (error, results, fields) => {
        if (error) {
            res.status(500).send('Erro ao consultar banco de dados');
        } else {
            const response = {
                message: 'Full cycle rocks',
                results: results
            };
            res.json(response);
        }
    });

    connection.end()

    //  res.status(200).json({ mensagem: 'Dados recebidos com sucesso!',body: results });
    // connection.end()
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})