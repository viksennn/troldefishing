import mongoose from "mongoose";

const fishingStatsData = new mongoose.Schema({
    art: String,
    lokation: String,
    agn: String,
    dato: String,
});

const fishingStats = new mongoose.Schema({
    navn: String,
    fiskeData: [fishingStatsData],
  }, { collection: 'FishingData' });
  
export const FishingModel = mongoose.models.FishingData || mongoose.model('FishingData', fishingStats);
  