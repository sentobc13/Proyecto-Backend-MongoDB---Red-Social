const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    userId:{
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });


PostSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

    
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;