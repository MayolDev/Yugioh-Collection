import { Card } from "../types/types.d";
// paginationUtils.ts
export const getLimitedCollection = (collection: Card[], limit: number, start: number): Card[] => {
    return collection.slice(start, limit);
  };