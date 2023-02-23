import mongoose from 'mongoose';

export const InfosSchema = mongoose.model('infos', new mongoose.Schema({
    content: String,
    name: String,
    slug: String,
}));

export const VirusSchema = mongoose.model('virus', new mongoose.Schema({
    content: String,
    filename: String,
    name: String,
}));
