
module.exports = (dbConnection,{Schema})=>{
    let {ObjectId} = Schema;

    let BannerSchema = new Schema({
        author:{
            type:ObjectId,
        },
        section:{
            type:String,
            required:false
        },
        title:{
            type:String,
            required:false
        },
        sub_title:{
            type:String,
            required:false,
        },
        description:{
            type:String,
            required:false,
        },
        icon:{
            type:String,
            required:false,
        },
        feature_title:{
            type:String,
            required:false,
        },
        feature_quote:{
            type:String,
            required:false,
        },
        feature_image:{
            type:String,
            required:false,
        },
        feature_button:{
            type:String,
            required:false,
        },
        contact_title:{
            type:String,
            required:false
        },
        contact_quote:{
            type:String,
            required:false
        },
        contact_description:{
            type:String,
            required:false
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
    let banner = dbConnection.model('homepages' , BannerSchema);
    return banner;
}