module.exports = (dbConnection , {Schema})=>{
    let {ObjectId} = Schema;

    let ContactSchema = new Schema({
        author:{
            type:ObjectId
        },
        first_name:{
            type:String,
            required:false
        },
        last_name:{
            type:String,
            required:false
        },
        phone_number:{
            type:String,
            required:false
        },
        email:{
            type:String,
            required:false
        },
        message:{
            type:String,
            required:false
        },
    })

    let contact = dbConnection.model("contacts" , ContactSchema);
    return contact ;
}