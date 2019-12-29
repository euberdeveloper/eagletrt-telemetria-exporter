const { MongoClient } = require('mongodb');

class Database {

    constructor(uri, options) {
        this.uri = uri;
        this.options = { ...options, useUnifiedTopology: true, useNewUrlParser: true };
        this.connection = null;
    }

    async connect() {
        this.connection = await MongoClient.connect(this.uri, this.options);
    }

    async listDatabases() {
        return (await this.connection.db().admin().listDatabases())
            .databases
            .map(database => database.name)
            .filter(database => !['admin', 'config', 'local'].includes(database));
    }
    
    async listCollections(db) {
        return (await this.connection.db(db).listCollections().toArray())
            .map(collection => collection.name)
            .filter(collection => !/^system/.test(collection));
    }
    
    async disconnect() {
        await this.connection.close();
    }

}

module.exports = Database;