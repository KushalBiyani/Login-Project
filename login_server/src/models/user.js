const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
}, { timestamps: true });



userSchema.pre('save', async function (next) {
    try {

        if (this.isNew) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(this.hash_password, salt);
            this.hash_password = hash

        }
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);