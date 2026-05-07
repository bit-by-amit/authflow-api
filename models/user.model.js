import mongoose from "mongoose";
// user kaa collection mei jo document hoga wo kis type kaa hoga .. usi kaa code hai..
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name : {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    }
});


// ab user collection or model kaa code hai..

const User = mongoose.model("User", userSchema)

export default User;
