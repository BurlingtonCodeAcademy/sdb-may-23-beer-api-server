const { mongoose } = require("../db")

/* 
    ? Schema
    * allows us to define the data structure for a particular collection
*/

const User = new mongoose.Schema(
    {
        name: {
            // Validators
            type: String,
            required: true,
            max: 100,
            validate: /[a-z\s]/
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

// ? Generate a collection by creating a MODEL
module.exports = mongoose.model("user", User)