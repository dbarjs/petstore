import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../errors/AppErrors';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product ID not found.');
    }

    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
