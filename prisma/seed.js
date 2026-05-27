const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = [
  {
    name: 'Love Is Love Tee',
    price: 34.99,
    category: 'Best Sellers',
    description: 'A timeless statement piece featuring the iconic "Love Is Love" message in vibrant rainbow colors on premium organic cotton.',
    tags: 'Best Seller',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Heather Grey'],
  },
  {
    name: 'Pride Flag Tee',
    price: 32.99,
    category: 'Pride Collection',
    description: 'Wear the rainbow with pride. Classic pride flag design printed on soft, breathable 100% organic cotton.',
    tags: 'Pride',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Natural'],
  },
  {
    name: 'Be You Tee',
    price: 29.99,
    category: 'Sale',
    description: 'An empowering design that celebrates authenticity. "Be You" — because there\'s no one better to be.',
    tags: 'Sale',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Lavender', 'White', 'Black'],
  },
  {
    name: 'Geometric Pride Tee',
    price: 36.99,
    category: 'New Arrivals',
    description: 'Modern geometric patterns meet pride colors in this contemporary design. A fresh take on pride fashion.',
    tags: 'New',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Charcoal', 'White'],
  },
  {
    name: 'Love Spectrum Tee',
    price: 34.99,
    category: 'Best Sellers',
    description: 'Celebrate the full spectrum of love with this beautifully designed tee featuring gradient pride colors.',
    tags: 'Best Seller',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black'],
  },
  {
    name: 'Trans Rights Tee',
    price: 34.99,
    category: 'Pride Collection',
    description: 'Stand in solidarity with the trans community. Featuring the trans pride flag colors on premium cotton.',
    tags: 'Pride',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Light Blue', 'Pink'],
  },
  {
    name: 'Unity Flag Tee',
    price: 31.99,
    category: 'Sale',
    description: 'United in pride. This tee features a modern unity flag design symbolizing togetherness and acceptance.',
    tags: 'Sale',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Heather Grey', 'Black'],
  },
  {
    name: 'Proud Statement Tee',
    price: 37.99,
    category: 'New Arrivals',
    description: 'Make a bold statement with this eye-catching design. Premium quality, unapologetically proud.',
    tags: 'New',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Navy'],
  },
];

async function main() {
  console.log('Seeding database...');
  
  // 1. Create a default admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@prideandjoy.com',
      role: 'ADMIN',
    },
  });
  console.log('Created Admin User');

  // 2. Create a default vendor
  const vendorUser = await prisma.user.create({
    data: {
      name: 'QueerThreads',
      email: 'hello@queerthreads.com',
      role: 'USER',
    },
  });

  const vendor = await prisma.vendor.create({
    data: {
      name: 'QueerThreads',
      commissionRate: 15.0,
      userId: vendorUser.id,
    },
  });
  console.log('Created Vendor QueerThreads');

  // 3. Create products & variants
  for (let i = 0; i < productsData.length; i++) {
    const pData = productsData[i];
    
    // Create base product
    const product = await prisma.product.create({
      data: {
        name: pData.name,
        slug: pData.name.toLowerCase().replace(/ /g, '-'),
        description: pData.description,
        category: pData.category,
        tags: pData.tags,
        image: `/images/${pData.name.toLowerCase().replace(/ /g, '-')}.png`,
        vendorId: i % 2 === 0 ? vendor.id : null, // Assign half to vendor, half in-house
      },
    });

    console.log(`Created Product: ${product.name}`);

    // Create variants (sizes x colors)
    for (const size of pData.sizes) {
      for (const color of pData.colors) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            size: size,
            color: color,
            sku: `${pData.name.substring(0,3).toUpperCase()}-${size}-${color.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
            price: pData.price,
            stock: Math.floor(Math.random() * 50) + 5, // Random stock between 5 and 55
          },
        });
      }
    }
  }

  // 4. Create some dummy orders
  const customer = await prisma.user.create({
    data: {
      name: 'Alex Morgan',
      email: 'alex.m@example.com',
      role: 'USER',
    },
  });

  // Get a random variant to purchase
  const randomVariant = await prisma.productVariant.findFirst();

  if (randomVariant) {
    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-2026-9042',
        customerId: customer.id,
        totalAmount: randomVariant.price * 2,
        status: 'PROCESSING',
        items: {
          create: [
            {
              variantId: randomVariant.id,
              quantity: 2,
              price: randomVariant.price,
            },
          ],
        },
      },
    });
    console.log(`Created Order: ${order.orderNumber}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
