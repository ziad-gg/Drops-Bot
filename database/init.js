const mongoose = require('mongoose')

module.exports = {
    init() {
        // Connect To mongoose
        mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME
        });

        // Create a connection instance
        const db = mongoose.connection;

        // Event: Connection established
        db.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        // Event: Connection error
        db.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        // Event: Connection disconnected
        db.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });

        // Event: Process termination
        // process.on('SIGINT', async () => {
        //     await db.close(true); // force close db
        //     console.log('MongoDB connection closed');
        //     process.exit(0);
        // });

        return {
            users: require('./models/UserSchema'),
            guilds: require('./models/GuildsSchema')
        }
    },
}