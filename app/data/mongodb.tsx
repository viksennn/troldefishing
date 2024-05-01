import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected baby');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};