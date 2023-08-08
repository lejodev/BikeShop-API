import { MongoClient, MongoClientOptions } from 'mongodb';

const mongoOptions: MongoClientOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};

// const connectionUri = 'mongodb://localhost:27017'; // Change this URI to your MongoDB instance
const uri: string = process.env.MONGODB_URI!;
const dbName: string = process.env.MONGODB_DATABASE!;

// const dbName = 'yourDatabaseName'; // Change this to your desired database name

export async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(uri, mongoOptions);
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
