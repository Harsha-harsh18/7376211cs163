//code for connection with mongodb

const {MongoClient} = require('mongodb')

let dbConnection
function connectToDb(callBack) {
    dbConnection =MongoClient.connect('mongodb://127.0.0.1:27017/RecipeSharingApp').then(function(client) { // this 127.0.0..(go live and get this and paste)
        dbConnection = client.db()
        console.log('connected')
        callBack()
    }).catch(function(error) {
        callBack(error)
    })
}

function getDb() {
    return dbConnection
}

// Exporting required functions
module.exports = {connectToDb, getDb}

