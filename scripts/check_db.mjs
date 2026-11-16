import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const sAdmin = client.db('steadfastadmin');
  const collections = await sAdmin.listCollections().toArray();
  console.log('steadfastadmin collections:');
  for (const c of collections) {
    const count = await sAdmin.collection(c.name).countDocuments();
    console.log(` - ${c.name}: ${count}`);
    if (c.name === 'settings') {
      const doc = await sAdmin.collection(c.name).findOne({});
      console.log('SETTINGS DOC:', doc);
    }
  }

  await client.close();
}
run();

