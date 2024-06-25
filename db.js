import { connect, connection as _connection } from 'mongoose';

const MONGODB_URI = 'mongodb+srv://gambusha2000:<Sfxedgs6lfs5re28>@url-shortener.mtunq3q.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener';

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = _connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

export default connection;
