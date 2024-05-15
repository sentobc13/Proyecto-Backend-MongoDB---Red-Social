const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, "Por favor rellene todos los campos"]
    },    
    body:{ 
        type:String,
        required: [true, "Por favor rellene todos los campos"]
    },    
    comments:[{ 
        userId:{ type: ObjectId, ref: "User"},
        comment: String
    }],
    likes:[{type: ObjectId, ref:"User"}],
    dislikes:[{type: ObjectId, ref:"User"}],
}, { timestamps: true });


PostSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

    
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;