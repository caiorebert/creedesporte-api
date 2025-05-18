// src/seeds/index.ts
import { AppDataSource } from '../../src/data-source';
import { seedProdutos } from './produto.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    await seedProdutos(dataSource);
    console.log('Seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding error:', error);
    process.exit(1);
  });