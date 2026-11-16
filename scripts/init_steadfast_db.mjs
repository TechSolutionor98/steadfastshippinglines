import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const client = new MongoClient(uri);

async function initDb() {
  await client.connect();
  const db = client.db('steadfastadmin');

  // 1. Initialize website_settings
  await db.collection('settings').updateOne(
    { _id: 'website_settings' },
    {
      $set: {
        siteName: 'Steadfast Shipping',
        legalName: 'Steadfast Shipping (PVT) LTD',
        phone: '+92 321 8662 222',
        email: 'info@steadfastshipping.com',
        address: 'Office No. 1, First Floor, Bilal Center, West Canal Road, Faisalabad - Pakistan',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        whatsapp: '+923218662222',
        googleAnalyticsId: '',
        googleTagManagerId: '',
        facebookPixelId: '',
        updatedAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );
  console.log('website_settings updated in steadfastadmin!');

  // 2. Initialize default cms_seo for /
  await db.collection('cms_seo').updateOne(
    { path: '/', websiteId: 'default' },
    {
      $set: {
        path: '/',
        websiteId: 'default',
        metaTitle: 'Steadfast Shipping | Tailored Logistics Services for Every Need',
        metaDescription: 'Steadfast Shipping (PVT) LTD provides comprehensive freight & logistics solutions including Ocean Freight, Air Freight, Road Freight, Warehousing, Cargo Services, Customs Clearance, and Door-to-Door Delivery worldwide.',
        metaKeywords: ['Steadfast Shipping', 'Freight Forwarding', 'Logistics Pakistan', 'Ocean Freight', 'Air Freight', 'Cargo Services'],
        canonicalUrl: 'https://steadfastshipping.com/',
        robots: { index: true, follow: true },
        openGraph: {
          title: 'Steadfast Shipping | Tailored Logistics Services for Every Need',
          description: 'Comprehensive global logistics and freight solutions.',
          siteName: 'Steadfast Shipping',
          url: 'https://steadfastshipping.com/',
          type: 'website'
        },
        twitterCard: {
          cardType: 'summary_large_image',
          title: 'Steadfast Shipping | Tailored Logistics Services for Every Need',
          description: 'Comprehensive global logistics and freight solutions.'
        },
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
  console.log('cms_seo for / updated in steadfastadmin!');

  // 3. Clear any old cms_page_content in steadfastadmin
  await db.collection('cms_page_content').deleteMany({});
  console.log('cms_page_content reset for fresh rendering.');

  await client.close();
}

initDb().catch(console.error);
