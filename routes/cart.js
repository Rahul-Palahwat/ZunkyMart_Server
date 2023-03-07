const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
// const User = require('../models/User');
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get loggedin User Cart details using: GET "/api/auth/mycart". login required
router.get('/mycart', fetchuser, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id);
        const cart = await Cart.find({ user: req.user.id });
        res.json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add new Item using : GET "api/auth/additem". Login required
router.post('/additem', fetchuser, async (req, res) => {
    try {
        const { itemCode,imgLink, qty,product,delivered } = req.body;
        // If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newItem = new Cart({
            user: req.user.id,
            itemCode,
            imgLink,
            qty,
            product,
            delivered,
        })
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({msg:"Internal Server Error",error});
    }
});


// // ROUTE 3: Delete a post using: DELETE "api/auth/deleteitem". Login required
router.delete('/deleteitem/:id', fetchuser, async (req, res) => {
    try {
        // Find the item to delete
        let cartItem = await Cart.findById(req.params.id);
        if (!cartItem) { return res.status(404).send("NOT FOUND") }

        // Allow to delete only if user owns this cart item
        if (cartItem.user.toString() !== req.user.id) {
            return res.status(401).json("Access Denied");
        }

        cartItem = await Cart.findByIdAndDelete(req.params.id);
        res.send({ "Success": "Item has been removed", cartItem })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// // ROUTE 3: Edit quantity of item using: PUT "api/auth/changeqty". Login required
router.put('/changeqty/:id', fetchuser, async (req, res) => {
    try {
        const { qty } = req.body;
        // Create a new object
        const updatedQty = {};
        if (qty) { updatedQty.qty = qty }

        // Find the item to be updated and update it
        let item = await Cart.findById(req.params.id);
        if (!item) { return res.status(404).send("NOT FOUND") }

        // Allow updation only if user added to it cart
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json("Access Denied");
        }

        let updatedItem = await Cart.findByIdAndUpdate(req.params.id, { $set: updatedQty }, { new: true });
        res.json({ updatedItem });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router