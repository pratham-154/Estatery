module.exports = (dbConnection,{Schema})=>{
    let {ObjectId} = Schema;
    
    let CategorySchema = new Schema({
        author:{
            type : ObjectId,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        slug:{
            type:String,
            required:false,
        },
        icon:{
            type:[String],
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
        }
    })
    let propertyCategory = dbConnection.model('propertycategories',CategorySchema);
    return propertyCategory;
}