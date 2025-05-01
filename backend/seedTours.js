// seedTours.js

require('dotenv').config();
const sequelize = require('./config/database');
const Tour = require('./models/tour');

const allTours = [
  {
    id: 1,
    title: "Alpine Wilderness Trek",
    location: "Swiss Alps",
    duration: "7 days",
    groupSize: "4-12 people",
    price: 1899,
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    difficulty: "Moderate",
    category: "Hiking",
  },
  {
    id: 2,
    title: "Ancient Forest Expedition",
    location: "Pacific Northwest",
    duration: "5 days",
    groupSize: "2-8 people",
    price: 1299,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    difficulty: "Easy",
    category: "Wildlife",
  },
  {
    id: 3,
    title: "Desert Canyon Adventure",
    location: "Grand Canyon",
    duration: "6 days",
    groupSize: "4-10 people",
    price: 1599,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    difficulty: "Challenging",
    category: "Hiking",
  },
  {
    id: 4,
    title: "Mountain Photography Workshop",
    location: "Canadian Rockies",
    duration: "8 days",
    groupSize: "6-10 people",
    price: 2199,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    difficulty: "Easy",
    category: "Photography",
  },
  {
    id: 5,
    title: "Coastal Wilderness Journey",
    location: "Oregon Coast",
    duration: "4 days",
    groupSize: "2-8 people",
    price: 1099,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    difficulty: "Moderate",
    category: "Hiking",
  },
  {
    id: 6,
    title: "Indigenous Culture Exploration",
    location: "New Zealand",
    duration: "10 days",
    groupSize: "4-12 people",
    price: 2799,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    difficulty: "Easy",
    category: "Cultural",
  },
];

async function seedTours() {
  try {
    await sequelize.sync({ force: false }); // Don't drop tables, just sync if needed
    await Tour.bulkCreate(allTours, { ignoreDuplicates: true });
    console.log('✅ Tours inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting tours:', error);
    process.exit(1);
  }
}

seedTours();
