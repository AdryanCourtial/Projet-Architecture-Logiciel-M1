import { PrismaClient } from '@prisma/client';

async function seedCategories(prisma: PrismaClient) {
  try {
    await prisma.category.deleteMany({});

    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Decks',
          description:
            'Planches de skateboard de haute qualité pour tous les niveaux',
        },
        {
          name: 'Trucks',
          description:
            'Essieux et trucks pour skateboards, durables et performants',
        },
        {
          name: 'Wheels',
          description:
            'Roues de skateboard en uréthane de différentes duretés et tailles',
        },
        {
          name: 'Bearings',
          description:
            'Roulements de qualité pour une meilleure vitesse et performance',
        },
        {
          name: 'Grip Tape',
          description:
            'Adhésif antidérapant pour skateboards, designs variés',
        },
        {
          name: 'Protective Gear',
          description:
            'Casques, coudières et protections pour la sécurité',
        },
        {
          name: 'Skate Shoes',
          description:
            'Chaussures de skateboard confortables et durables',
        },
        {
          name: 'Hardware & Tools',
          description:
            'Vis, écrous, outils et pièces de rechange pour skateboards',
        },
        {
          name: 'Longboards',
          description:
            'Longboards pour le cruising et le downhill',
        },
        {
          name: 'Complete Setups',
          description:
            'Skateboards complets prêts à l\'emploi pour débutants et confirmés',
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
