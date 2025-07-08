require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
    try{
        await client.connect();
        console.log('Connected to database.');
        const db = client.db('taskdb');
        const taskCollection = db.createCollection('task');
        const inserted = (await taskCollection).insertMany([
            { description: "Submit report", completed: false },
            { description: "Create ppt slides", completed: false },
            { description: "Start the project", completed: false },
        ]);
        console.log('tasks added: ', inserted.insertedIds);

        const list = (await taskCollection).find({}).toArray();
        console.log('tasks: ', list);

        const updated = (await taskCollection).updateOne(
            { description: "Create ppt slides" },
            { $set: { completed: true} }
        );
        console.log('Updated task: ', (await updated).modifiedCount);

        const deleted = (await taskCollection).deleteOne(
            { description: "Start the project" }
        );
        console.log('Deleted task: ', (await deleted).deletedCount);

        const uplist = (await taskCollection).find({}).toArray();
        console.log('tasks: ', uplist);
    }
    catch (err) {
        console.error('Error: ', err);
    }
    finally {
        client.close();
    }
}
main();