import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const client = new MongoClient(uri);

async function syncRoutes() {
  await client.connect();
  const db = client.db('steadfastadmin');

  const appDir = path.join(process.cwd(), 'src', 'app');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });

  const routes = [
    {
      path: '/',
      type: 'static',
      depth: 0,
      fileName: 'page.js',
      filePath: 'src/app/page.js',
      hasLayout: true,
      status: 'active',
      websiteId: 'default',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith('_') || name.startsWith('.') || name === 'api' || name === 'admin' || name === 'node_modules') {
      continue;
    }
    const fullPath = path.join(appDir, name);
    const hasPage = fs.existsSync(path.join(fullPath, 'page.js'));
    if (hasPage) {
      routes.push({
        path: `/${name}`,
        type: 'static',
        depth: 1,
        fileName: 'page.js',
        filePath: `src/app/${name}/page.js`,
        hasLayout: false,
        status: 'active',
        websiteId: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  console.log(`Found ${routes.length} Steadfast routes to sync:`);
  for (const r of routes) {
    console.log(` - ${r.path} (${r.filePath})`);
  }

  await db.collection('cms_routes').deleteMany({ websiteId: 'default' });
  const result = await db.collection('cms_routes').insertMany(routes);
  console.log(`Successfully synced ${result.insertedCount} routes in steadfastadmin DB!`);

  await client.close();
}

syncRoutes().catch(console.error);
