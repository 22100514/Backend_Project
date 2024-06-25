import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const urlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }
});

const Url = model('Url', urlSchema);

export default Url;
