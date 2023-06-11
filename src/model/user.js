import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    coin: {
        type: Number,
        default: 0,
    },
    dailyReward: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;