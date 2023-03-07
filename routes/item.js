const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Item = require('../models/Item');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Add item to BKB using POST : "/api/auth/getproducts". login required
router.post('/newitem', fetchuser, async (req, res) => {
    try {
        const { itemCode, title, imgLink, category, rating, reviews, price, mrp, description, discount } = req.body;

        const user = await User.findById(req.user.id);
        if (user.email !== "admin123@gmail.com") {
            return res.json({ "Message": "Sorry! You are not authorized to add items" })
        }

        // If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newItem = new Item({
            itemCode,
            title,
            imgLink,
            category,
            discount,
            mrp,
            price,
            reviews,
            rating,
            description
        })
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getallitems', async (req, res) => {
    try {
        let items = [];
        items = await Item.find();

        let success = true;
        if (items.length == 0) {
            success = false;
        }
        res.json({ items, success });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 1: Get items of some category: POST "/api/auth/getproducts". login required
router.get('/getproducts/:category', async (req, res) => {
    try {
        // const user = await User.findById(req.user.id);
        const items = await Item.find({ category: req.params.category });
        res.json(items); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getitem/:itemcode', async (req, res) => {
    try {
        // const user = await User.findById(req.user.id);
        const item = await Item.find({ itemCode: req.params.itemcode });
        res.json(item);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router