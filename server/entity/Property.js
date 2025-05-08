module.exports = (dbConnection,{Schema})=>{
    let {ObjectId} = Schema;
    
    let PropertySchema = new Schema({
        author:{
            type : ObjectId,
        },
        type:{
            type:String,
            required:false,
        },
        email:{
            type:String,
            required:false,
        },
        city:{
            type:String,
            required:false,
        },
        address:{
            type:String,
            required:false,
        },
        area:{
            type:Number,
            required:false,
        },
        bedrooms:{
            type:String,
            required:false,
        },
        bathrooms:{
            type:String,
            required:false,
        },
        floors:{
            type:String,
            required:false,
        },
        description:{
            type:String,
            required:false,
        },
        price:{
            type:Number,
            required:false,
        },
        role:{
            type:String,
            required:false,
        },
        availability:{
            type:String,
            required:false,
        },
        contact_name:{
            type:String,
            required:false,
        },
        contact_number:{
            type:String,
            required:false
        },
        image:{
            type:[String], // uploads
            required:false,
        },
        status:{
            type:Number,
            default:1,
        },
        deleted_at:{
            type: Date,
            required:false,
        },
        created_at:{
            type:Date,
            default: new Date(),
        },
        updated_at:{
            type:Date,
            required:false,
        },
        user_id:{
            type:ObjectId,
            required:false,
            ref:'users'
        },
        slug: {
            type:String,
            required:false
        },
        cat_id:{
            type:ObjectId,
            required:false,
            ref:'propertycategories'
        }
    })
    let property = dbConnection.model('properties',PropertySchema);
    return property;
}