import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    admin: { type: Boolean, default: false },
    password: String,
    username: String,
});

export default mongoose.model('users', UserSchema);
