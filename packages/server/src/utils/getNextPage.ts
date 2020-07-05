function getNextPage(
  total: number,
  currentPage: number,
  itemsByPage = 10,
): number {
  return (currentPage + 1) * itemsByPage > total ? 1 : 0;
}

export default getNextPage;
