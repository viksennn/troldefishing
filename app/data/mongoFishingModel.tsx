import mongoose from "mongoose";

const fishingStatsData = new mongoose.Schema({
    art: String,
    lokation: String,
    agn: String,
    dato: String,
    imgUrl: String,
    imgKey: String,
});

const fishingStats = new mongoose.Schema({
    navn: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fiskeData: {
        type: [fishingStatsData],
        required: true,
    },
  }, { collection: 'FishingData' });

export const FishingModel = mongoose.models.FishingData || mongoose.model('FishingData', fishingStats);


const adminFiskeData = new mongoose.Schema({
    adminSettingName: String,
    fiskeArter: [String],
}, { collection: 'AdminData' });

export const AdminFiskeModel = mongoose.models.AdminFiskeData || mongoose.model('AdminFiskeData', adminFiskeData);

