require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app = express();
var bodyParser = require("body-parser");

const base_url = "https://env-7146021.proen.app.ruk-com.cloud";
const CatService = require("./services/cat");
const CustomerService = require("./services/customer");
const OrderService = require("./services/order");
const BreedService = require("./services/breed");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
    try {
        const response = await CatService.getAll();
        res.render("cat", { cats: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Cat routes
app.get("/cat", async (req, res) => {
    try {
        const response = await CatService.getAll();
        res.render("cat", { cats: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.get("/cat/create", async (req, res) => {
    const breeds = await BreedService.getAll();
    res.render("cat/form", { 
        cat: {},
        breeds: breeds.data
    });
});
app.get("/cat/:id", async (req, res) => {
    try {
        const response = await CatService.getById(req.params.id);
        res.render("cat/detail", { cat: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.post("/cat/create", async (req, res) => {
    try {
        const catData = req.body;
        await CatService.create(catData);
        res.redirect("/cat");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating cat");
    }
});
app.get("/cat/:id/edit", async (req, res) => {
    try {
        const response = await CatService.getById(req.params.id);
        const breeds = await BreedService.getAll();
        res.render("cat/form", { 
            cat: response.data,
            breeds: breeds.data
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});
app.post("/cat/:id/edit", async (req, res) => {
    try {
        const catId = req.params.id;
        const catData = req.body;
        await CatService.update(catId, catData);
        res.redirect("/cat");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating cat");
    }
});
app.get("/cat/:id/delete", async (req, res) => {
    try {
        await CatService.delete(req.params.id);
        res.redirect("/cat");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Customer routes
app.get("/customer", async (req, res) => {
    try {
        const response = await CustomerService.getAll();
        res.render("customer", { customers: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.get("/customer/create", (req, res) => {
    res.render("customer/form", { customer: {} });
});
app.get("/customer/:id", async (req, res) => {
    try {
        const response = await CustomerService.getById(req.params.id);
        res.render("customer/detail", { customer: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.post("/customer/create", async (req, res) => {
    try {
        const customerData = req.body;
        await CustomerService.create(customerData);
        res.redirect("/customer");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating customer");
    }
});
app.get("/customer/:id/edit", async (req, res) => {
    try {
        const response = await CustomerService.getById(req.params.id);
        res.render("customer/form", { customer: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});
app.post("/customer/:id/edit", async (req, res) => {
    try {
        const customerId = req.params.id;
        const customerData = req.body;
        await CustomerService.update(customerId, customerData);
        res.redirect("/customer");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating customer");
    }
});
app.get("/customer/:id/delete", async (req, res) => {
    try {
        await CustomerService.delete(req.params.id);
        res.redirect("/customer");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Order routes
app.get("/order", async (req, res) => {
    try {
        const response = await OrderService.getAll();
        res.render("order", { orders: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.get("/order/create", async (req, res) => {
    const cats = await CatService.getAll();
    const customers = await CustomerService.getAll();
    console.log(cats)
    res.render("order/form", { 
        order: {},
        cats: cats.data,
        customers: customers.data
    });
});
app.get("/order/:id", async (req, res) => {
    try {
        const response = await OrderService.getById(req.params.id);
        res.render("order/detail", { order: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.post("/order/create", async (req, res) => {
    try {
        const orderData = req.body;
        await OrderService.create(orderData);
        res.redirect("/order");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating order");
    }
});
app.get("/order/:id/edit", async (req, res) => {
    try {
        const orders = await OrderService.getById(req.params.id);
        const cats = await CatService.getAll();
        const customers = await CustomerService.getAll();
        res.render("order/form", { 
            order: orders.data,
            cats: cats.data,
            customers: customers.data
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});
app.post("/order/:id/edit", async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderData = req.body;
        await OrderService.update(orderId, orderData);
        res.redirect("/order");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating order");
    }
});
app.get("/order/:id/delete", async (req, res) => {
    try {
        await OrderService.delete(req.params.id);
        res.redirect("/order");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Breed routes
app.get("/breed", async (req, res) => {
    try {
        const response = await BreedService.getAll();
        res.render("breed", { breeds: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.get("/breed/create", (req, res) => {
    res.render("breed/form", { breed: {} });
});
app.get("/breed/:id", async (req, res) => {
    try {
        const response = await BreedService.getById(req.params.id);
        res.render("breed/detail", { breed: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.post("/breed/create", async (req, res) => {
    try {
        const data = req.body;
        await BreedService.create(data);
        res.redirect("/breed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating breed");
    }
});
app.get("/breed/:id/edit", async (req, res) => {
    try {
        const response = await BreedService.getById(req.params.id);
        res.render("breed/form", { breed: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});
app.post("/breed/:id/edit", async (req, res) => {
    try {
        const breedId = req.params.id;
        const data = req.body;
        await BreedService.update(breedId, data);
        res.redirect("/breed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating breed");
    }
});
app.get("/breed/:id/delete", async (req, res) => {
    try {
        await BreedService.delete(req.params.id);
        res.redirect("/breed");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Report routes
app.get("/report", async (req, res) => {
    try {
        const response = await OrderService.getReport();
        res.render("report", { reports: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});
app.get("/report/detail", async (req, res) => {
    try {
        const { date } = req.query;
        const response = await OrderService.getReportByDate(date);
        console.log(response.data);
        res.render("report/detail", { 
            date: date,
            results: response.data 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`App running at http://localhost:5500`);
});
