const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust the model path

// Hardcoded MongoDB URI for local MongoDB instance
const MONGO_URI = 'mongodb+srv://lucknerablard:Bo8iNmAaD0CCTQ3S@knighttint.j9alfru.mongodb.net/knighttint?retryWrites=true&w=majority'; // Replace with your actual database name

async function removeBrokenImages() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB ✅');

    await Product.updateMany({}, { $unset: { image: 1 } });
    console.log('Removed broken image URLs from database ✅');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

removeBrokenImages();
