import mongoose from "mongoose";

const fishingStatsDataNew = new mongoose.Schema({
    art: String,
    lokation: String,
    agn: String,
    dato: String,
    imgUrl: {
        type: String,
        default: null,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
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
        type: [fishingStatsDataNew],
        required: true,
    },
    profilImgUrl: {
        type: String,
        required: true,
    },
  }, { collection: 'FishingData' });

export const FishingModel = mongoose.models.FishingData || mongoose.model('FishingData', fishingStats);

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        ref: 'FishingData'
    },
}, { collection: 'Comments' });

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        ref: 'FishingData'
    },
    comments: {
        type: [commentSchema],
        required: true,
    },
    likes: {
        type: Array,
        required: true,
        ref: 'FishingData'
    },
    image: {
        type: String,
        ref: 'Media'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, { collection: 'Posts' });

export const PostModel = mongoose.models.Posts || mongoose.model('Posts', postSchema);

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FishingData'
    },
    refId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts, FishingData'
    },
}, { collection: 'Media' });

export const MediaModel = mongoose.models.Media || mongoose.model('Media', mediaSchema);