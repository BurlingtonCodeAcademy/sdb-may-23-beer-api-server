const { mongoose } = require("../db")

const Beer = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            cast: false
        },
        brewery: {
            type: String,
            required: true
        },
        abv: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        style: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("beer", Beer)