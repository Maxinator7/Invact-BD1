const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

// var's
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// End-point 1
app.get('/cart-total', (req, res) => {
  let newIteamPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newIteamPrice + cartTotal;
  return res.send(total.toString());
});

// End-point 2

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  if (isMember === 'true') {
    cartTotal = cartTotal - (cartTotal / 100) * discountPercentage;
  }
  return res.send(cartTotal.toString());
});

// End-point 3

app.get('/calculate-tax', (req, res) => {
  cartTotal = parseFloat(req.query.cartTotal);

  let taxableAmount = (cartTotal / 100) * taxRate;

  return res.send(taxableAmount.toString());
});

// End-point 4

app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  shippingMethod = shippingMethod.toLowerCase(); // case conversion

  let eta = distance / 100;
  if (shippingMethod === 'standard') {
    eta = distance / 50;
  }

  return res.send(eta.toString());
});

// End-point 5

function getShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);

  return res.send(getShippingCost(weight, distance).toString());
});

// End-point 6

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * loyaltyRate;
  return res.send(points.toString());
});

app.listen(port, () => {
  console.log(` live at http://localhost:${port}`);
});
