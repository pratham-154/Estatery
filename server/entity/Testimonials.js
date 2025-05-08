
module.exports = (dbConnection, {Schema}) => {
    let {ObjectId} = Schema;

    let FaqsSchema = new Schema({
        author: {
            type:ObjectId
        },
        title: {
            type:String,
            required:true
        },
        role:{
            type:String,
            required:false,
        },
        description:  {
            type:String,
            required:true
        },
        avatar:{
            type:String,
            required:false,
        },
        status:  {
            type:Number,
            default:1
        },
        slug: {
            type:String,
            required:false
        },
        deleted_at: {
            type:Date,
            required:false
        },
        created_at: {
            type:Date,
            required:true
        },
        updated_at: {
            type:Date,
            required:false
        },
    });

    let faqs = dbConnection.model('faqs',FaqsSchema);

    return faqs;
}