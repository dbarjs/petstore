import { getRepository } from 'typeorm';
import Product from '../models/Product';
import AppError from '../errors/AppErrors';

interface ProductDTO {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute(id: string, data: ProductDTO): Promise<void> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product ID not found.');
    }

    await productsRepository.update(id, data);
  }
}

export default UpdateProductService;
