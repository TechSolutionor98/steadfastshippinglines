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
        siteName: 'Steadfast Shipping Lines',
        legalName: 'Steadfast Shipping Lines (Pvt) Ltd',
        phone: '+92 312 7777952',
        phone2: '+92 312 7777951',
        email: 'info@steadfastshippinglines.com',
        website: 'www.steadfastshippinglines.com',
        address: 'P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan',
        karachiAddress: 'Saima Trade Tower, Block A 810 main I.I. Chundrigar road near Shaheen Complex, Karachi',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        whatsapp: '+923127777952',
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

