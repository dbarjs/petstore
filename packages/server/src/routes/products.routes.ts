import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateProductService from '../services/CreateProductService';
import Product from '../models/Product';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (request, response) => {
  const {
    q: query,
    name,
    description,
    category,
    page,
    per_page,
  } = request.query;

  const take = Number(per_page) > 0 ? Number(per_page) : 10;
  const skip = Number(page) > 0 ? Number(page) * take : 0;

  const productsRepository = getRepository(Product);

  if (query) {
    const [products, total_count] = await productsRepository.findAndCount({
      where: `"name" ILIKE '%${query}%' OR "description" ILIKE '%${query}%' OR "category" ILIKE '%${query}%'`,
      take,
      skip,
    });
    return response.json({
      products,
      total_count,
    });
  }

  if (name || description || category) {
    const [products, total_count] = await productsRepository.findAndCount({
      where: `"name" ILIKE '%${name}%' OR "description" ILIKE '%${description}%' OR "category" ILIKE '%${query}%'`,
      take,
      skip,
    });
    return response.json({
      products,
      total_count,
    });
  }

  const [products, total_count] = await productsRepository.findAndCount({
    take,
    skip,
  });

  return response.json({
    products,
    total_count,
  });
});

productsRouter.post('/', async (request, response) => {
  const { name, description, category, price, quantity } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    description,
    category,
    price,
    quantity,
  });

  return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, description, category, price, quantity } = request.body;

  const updateProductService = new UpdateProductService();
  await updateProductService.execute(id, {
    name,
    description,
    category,
    price: Number(price) || 0,
    quantity: Number(quantity) || 0,
  });

  return response.json({});
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProductService = new DeleteProductService();
  await deleteProductService.execute(id);

  return response.status(204).json({});
});

export default productsRouter;
