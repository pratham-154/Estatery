
module.exports = (dbConnection,{Schema})=>{
    let {ObjectId} = Schema;

    let PartnerSchema = new Schema({
        author:{
            type:ObjectId,
        },
        title:{
            type:String,
            required:false
        },
        icon:{
            type:String,
            required:false,
        },
        status:{
            type:Number,
            default:1,
        },
        created_at:{
            type: Date,
            required:false,
        },
        deleted_at:{
            type:Date,
            required:false
        },
        updated_at:{
            type:Date,
            required:false,
        },
    })
    let partner = dbConnection.model('partners' , PartnerSchema);
    return partner;
}