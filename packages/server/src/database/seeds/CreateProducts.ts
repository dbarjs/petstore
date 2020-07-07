import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import Product from '../../models/Product';
import getRandomProducts from '../../utils/getRamdomProducts';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const products = getRandomProducts(30);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products)
      .execute();
  }
}
