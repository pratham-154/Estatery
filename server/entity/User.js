const { set } = require("mongoose");
const { encrypt } = require("../helper/General");

module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let UserSchema = new Schema({
        author: {
            type: ObjectId
        },
        first_name: {
            type: String,
            required: false,
        },
        last_name: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false,
        },
        email_verified: {
            type: Boolean,
            required: false,
        },
        email_verified_at: {
            type: Date,
            required: false,
        },
        otp: {
            type: Number,
            required: false,
        },
        token: {
            type: String,
            required: false
        },
        login_token: {
            type: String,
            required: false
        },
        token_expiry_at: {
            type: Date,
            required: false,
        },
        last_login_at: {
            type: Date,
            required: false,
        },
        phone_number: {
            type: Number,
            required: false,
        },
        password: {
            type: String,
            required: false,
            set:(value)=>{
                return encrypt(value);
            }
        },
        liked:{
            type:[String],
            required:false
        },
        gender: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        status: {
            type: Number,
            default: 1
        },
        created_at: {
            type: Date,
            required: false,
        },
        updated_at: {
            type: Date,
            required: false,
        },
        created_by: {
            type: String,
            required: false
        },
        slug: {
            type: String,
            required: false,
        }
    })
    let user = dbConnection.model('users', UserSchema)
    return user
}