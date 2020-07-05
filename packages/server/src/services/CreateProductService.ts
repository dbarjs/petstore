import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../errors/AppErrors';

interface ProductDTO {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

class CreateProductService {
  public async execute({
    name,
    description = '',
    category = '',
    price = 0,
    quantity = 0,
  }: ProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product);

    if (!name) {
      throw new AppError('Product name required.');
    }

    const product = productsRepository.create({
      name,
      description,
      category,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
