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
    kommentarer: {
        type: Array,
        ref: 'Comments'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, { collection: 'Posts' });

export const PostModel = mongoose.models.Posts || mongoose.model('Posts', postSchema);

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
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
}, { collection: 'Comments' });

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