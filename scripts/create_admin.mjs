import crypto from 'crypto';
import { MongoClient } from 'mongodb';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'cms_salt_2024').digest('hex');
}

async function run() {
  const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('steadfastadmin');

  const email = 'admin@steadfastshippinglines.com';
  const password = 'admin123456';
  const passwordHash = hashPassword(password);

  await db.collection('cms_users').updateOne(
    { email },
    {
      $set: {
        name: 'Admin',
        email,
        passwordHash,
        role: 'super_admin',
        roles: ['super_admin'],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  console.log('SUCCESS: Admin user created in steadfastadmin database!');
  await client.close();
}

run().catch(console.error);
