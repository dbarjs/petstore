// return zero if doesn't have any more pages
export default function getNextPage(
  total: number,
  take: number,
  skip: number,
): number {
  const hasMorePages = total > skip + take;
  const currentPage = skip > 0 ? skip / take : 1;
  const nextPage = currentPage + 1;

  return hasMorePages ? nextPage : 0;
}
