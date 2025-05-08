
module.exports = (dbConnection , {Schema})=>{
    let {ObjectId} = Schema
    let BlogheadSchema = new Schema({
        author:{
            type:ObjectId
        },
        image:{
            type:String,
            required:false
        },
        title:{
            type:String,
            required:false
        },
        description:{
            type:String,
            required:false
        },
        nameAndDate:{
            type:String,
            required:false
        }
    })

    let bloghead = dbConnection.model("blogheads" , BlogheadSchema);
    return bloghead;
}