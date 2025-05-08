
module.exports = (dbConnection,{Schema})=>{
    let {ObjectId} = Schema;

    let FeatureSchema = new Schema({
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
        description:{
            type:String,
            required:false,
        },
        image:{
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
    let feature = dbConnection.model('homepage_features' , FeatureSchema);
    return feature;
}