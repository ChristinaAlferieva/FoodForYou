import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.model("Kitchen", kitchenSchema);
