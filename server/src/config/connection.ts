import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks'; LOCAL DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yosukekibe:w92eOpBuOhDtzgY6@clusterlibraria.3gogk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLibraria';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;

