import { Card } from "../types/types.d";

export const sortingCards = (sort: string, order: string, collection: Card[]): Card[] => {

    const sortedCollection = collection.sort((a, b) => {
        const valA = a[sort as keyof Card];
        const valB = b[sort as keyof Card];
    
        if (typeof valA === 'undefined' || typeof valB === 'undefined') {
          // Si al menos una de las cartas no tiene la propiedad, colócala al final
          return typeof valA === 'undefined' ? 1 : -1;
        }
    
        // Ambas cartas tienen la propiedad, realiza la comparación
        if (typeof valA === 'string' && typeof valB === 'string') {
          return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    
        // Si una de las propiedades es string y la otra número, priorizamos el string
        if (typeof valA === 'string' || typeof valB === 'string') {
          return order === 'asc' ? typeof valA === 'string' ? -1 : 1 : typeof valB === 'string' ? 1 : -1;
        }
    
        // Ambas propiedades son números
        return order === 'asc' ? valA - valB : valB - valA;
      });


      return sortedCollection;
    


}