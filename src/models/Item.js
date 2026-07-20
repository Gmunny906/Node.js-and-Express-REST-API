import mongoose from "mongoose";

//Every item document MUST have a title
const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, //skips trailing whitespace
        },
    },
    { timestamps : true }
);

export default mongoose.model("Item", itemSchema);

