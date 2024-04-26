import { IFisher } from '@/types/IFisher';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://viksennonbo:bWT2GG7HMHanaNWA@cluster0.fuifzfg.mongodb.net/TFDatabase');
    console.log('MongoDB connected baby');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};

const fishingStats = new mongoose.Schema({
  navn: String,
  fiskeData: [
    {
      Art: String,
      Lokation: String,
      Dato: String,
    },
  ],
}, { collection: 'FishingData' });

export const FishingModel = mongoose.models.FishingData || mongoose.model('FishingData', fishingStats);