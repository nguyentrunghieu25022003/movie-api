export type MongooseSortValue =
  | 1
  | -1
  | 'asc'
  | 'desc'
  | { $meta: 'textScore' };

export function buildSortQuery(
  sortField?: string,
  sortOrder?: 'asc' | 'desc',
): Record<string, MongooseSortValue> {
  if (sortField && sortOrder) {
    return { [sortField]: sortOrder === 'asc' ? 1 : -1 };
  }
  return { 'movie.created.time': -1 };
}
