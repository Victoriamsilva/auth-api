const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let connect = null

const retry = 5

const sleep = (timing) => new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, timing)
})

exports.retryConnect = async (dbName, collectionName) => {
    try {
        if (connect === null) {
            await client.connect();
            await client.db('admin').command({ ping: 1 })
            connect = client.db(dbName);
            console.log('Connected successfully to server');
        }
        if (connect != null) {
            await connect.command({ ping: 1 })
        }
        return {
            collection: connect.collection(collectionName)
        }
    } catch (error) {
        connect = null
        if (tryN > retry) throw new Error(error.message)
        await sleep(600)
        return retryConnect(dbName, collectionName, tryN + 1)
    }
}

exports.connectMongodb = async (dbName, collectionName) => {
    return this.retryConnect(dbName, collectionName)
}


