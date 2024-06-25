import { connect, connection as _connection } from 'mongoose';

const MONGODB_URI = 'mongodb+srv://gambusha2000:<Sfxedgs6lfs5re28>@url-shortener.mtunq3q.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener';

async function connectDB() {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
}

const connection = _connection;

export { connectDB, connection };
