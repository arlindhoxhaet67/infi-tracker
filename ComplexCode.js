/*
Filename: ComplexCode.js
Description: A complex code demonstrating a sample e-commerce website with multiple functionalities.
*/

// Import necessary modules and define global variables and constants

import * as utils from './utilities';
import { Product, User, Order } from './models';

const API_KEY = 'your-api-key';
const BASE_URL = 'https://api.example.com';

let currentUser = null;
let products = [];
let cart = [];

// Function to fetch all products from the API

async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products?api_key=${API_KEY}`);
    const data = await response.json();
    products = data.map(product => new Product(product));
    console.log('Products fetched successfully');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to authenticate the user using username and password

async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/login?api_key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    currentUser = new User(data);
    console.log('User logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

// Function to add a product to the cart

function addToCart(productId, quantity = 1) {
  const product = products.find(product => product.id === productId);
  if (product) {
    const existingCartItem = cart.find(item => item.productId === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    console.log('Product added to the cart');
  } else {
    console.error('Product not found');
  }
}

// Function to place an order

async function placeOrder() {
  if (!currentUser) {
    console.error('User not logged in');
    return;
  }

  if (cart.length === 0) {
    console.error('Cart is empty');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/orders?api_key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ userId: currentUser.id, cart })
    });

    const data = await response.json();
    const newOrder = new Order(data);
    console.log('Order placed successfully:', newOrder);
    cart = [];
  } catch (error) {
    console.error('Error placing order:', error);
  }
}

// Main function to initiate the e-commerce web app

async function main() {
  await fetchProducts();

  await login('john.doe@example.com', 'password');
  addToCart(1, 2);
  addToCart(3);

  await login('jane.smith@example.com', 'password');
  addToCart(2, 3);

  await login('john.doe@example.com', 'password');
  placeOrder();
}

// Execute the main function

main();