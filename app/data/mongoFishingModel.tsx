import mongoose from "mongoose";

const fangstSchema = new mongoose.Schema({
    art: String,
    lokation: String,
    agn: String,
    dato: Date,
    imgUrl: String,
    imgKey: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FishingData",
      required: true,
    },
  }, { collection: 'Fangster' });

  export const FangstModel = mongoose.models.Fangster || mongoose.model('Fangster', fangstSchema);

const fishingStats = new mongoose.Schema({
    navn: {
        type: String,
        required: true,
    },
    password: {
        type: String,
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

const imageItem = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

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
        type: imageItem,
        required: false,
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