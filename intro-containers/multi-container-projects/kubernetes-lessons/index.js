const express = require("express");
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
const dbName = "dockerApp";
const collectionName = "count";

async function start() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const app = express();

    app.get("/", async (req, res) => {
        const count = await collection.count();

        res.json({ success: true, count });
    })

    app.get("/add", async (req, res) => {
        const insert = await collection.insertOne({});

        res.json({ inserted: insert });
    })

    app.listen(3000, () => console.log("Server is running on port 3000"))

}

start().catch(err => {
    console.log(err);
    process.exit(1);
})
