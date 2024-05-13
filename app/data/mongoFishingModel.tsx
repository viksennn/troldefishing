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

const fiskeArter = new mongoose.Schema({
    art: String,
});

const adminFiskeData = new mongoose.Schema({
    adminSettingName: String,
    fiskeArter: [String],
}, { collection: 'AdminData' });

export const AdminFiskeModel = mongoose.models.AdminFiskeData || mongoose.model('AdminFiskeData', adminFiskeData);

