const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

const base_url = "http://localhost:5000";

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/cats');
        res.render("cats", { cats: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cat/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/cats/' + req.params.id);
        res.render("cat", { cat: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/create", (req, res) => {
    res.render('addcat');
});

app.post("/create", async (req, res) => {
    try {
        const data = { name: req.body.name, breed: req.body.breed, age: req.body.age };
        await axios.post(base_url + '/cats', data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const cats = await axios.get(base_url + '/cats/edit/' + req.params.id);
        const cat = cats.data;
        res.render("editcat", { cat });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { name: req.body.name, breed: req.body.breed, age: req.body.age };
        await axios.put(base_url + '/cats/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/cats/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log(`App running at http://localhost:5500`);
});
