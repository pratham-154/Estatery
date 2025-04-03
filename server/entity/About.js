
module.exports =  (dbConnection , {Schema})=>{
    let { ObjectId } = Schema;

    let AboutSchema = new Schema({
        author:{
            type:ObjectId,
        },
        image:{
            type:String,
            required:false
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        vision:{
            type:String,
            required:false,
        },
        ethic:{
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

    let about = dbConnection.model('abouts' , AboutSchema);
    return about;
}