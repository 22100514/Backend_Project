import express, { json, urlencoded } from 'express';
import { connect, model, Schema } from 'mongoose';
import { generate } from 'shortid';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://gambusha2000:<Sfxedgs6lfs5re28>@url-shortener.mtunq3q.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener'; 

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Url = model('Url', new Schema({
  originalUrl: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now }
}));

app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      const shortUrl = generate();
      url = new Url({ originalUrl, shortUrl });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
