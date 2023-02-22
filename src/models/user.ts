import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

export default mongoose.model('users', UserSchema);
