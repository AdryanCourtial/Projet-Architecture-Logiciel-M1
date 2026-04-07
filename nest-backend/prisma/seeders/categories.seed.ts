import { PrismaClient } from '@prisma/client';

async function seedCategories(prisma: PrismaClient) {
  try {
    await prisma.category.deleteMany({});

    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Decks',
          description:
            'High-quality skateboard decks for all skill levels',
        },
        {
          name: 'Trucks',
          description:
            'Durable and high-performance skateboard trucks',
        },
        {
          name: 'Wheels',
          description:
            'Urethane skateboard wheels in various hardness levels and sizes',
        },
        {
          name: 'Bearings',
          description:
            'Premium bearings for better speed and smoother rides',
        },
        {
          name: 'Grip Tape',
          description:
            'Non-slip grip tape for skateboards with various styles',
        },
        {
          name: 'Protective Gear',
          description:
            'Helmets, pads, and protective gear for safer skating',
        },
        {
          name: 'Skate Shoes',
          description:
            'Comfortable and durable skateboarding shoes',
        },
        {
          name: 'Hardware & Tools',
          description:
            'Bolts, nuts, tools, and replacement parts for skateboards',
        },
        {
          name: 'Longboards',
          description:
            'Longboards built for cruising and downhill riding',
        },
        {
          name: 'Complete Setups',
          description:
            'Ready-to-ride complete skateboards for beginners and advanced riders',
        },
      ],
    });

    console.log(`✓ ${categories.count} categories created successfully`);
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

export { seedCategories };
