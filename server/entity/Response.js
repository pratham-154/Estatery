module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let ResponseSchema = new Schema({
        author: {
            type: ObjectId
        },
        first_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: false
        },
        contact_number: {
            type: String,
            required: false
        },
        email: {
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
        sender_id: {
            type: ObjectId,
            required: false,
            ref: 'users'
        },
        reciever_id: {
            type: ObjectId,
            required: false,
            ref: 'users'
        },
        property_id: {
            type: ObjectId,
            required: false,
            ref: 'properties'
        },
        created_at: {
            type: Date,
            required: false
        },
        created_by: {
            type: Date,
            required: false
        },
        deleted_at: {
            type: String,
            required: false
        }
    })

    let response = dbConnection.model('responses', ResponseSchema);
    return response
}