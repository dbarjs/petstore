import faker from 'faker';

interface Product {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}

function getProduct(quantity?: number): Product {
  return {
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.lorem.words(Math.floor(Math.random() * (12 - 4) + 4)),
    price: Number(faker.commerce.price()),
    quantity: quantity || Math.floor(Math.random() * 99),
  };
}

export default function getRandomProducts(
  n: number,
  quantity?: number,
): Product[] {
  const products = Array.from(Array(n).keys());

  return products.map(_ => getProduct(quantity));
}
