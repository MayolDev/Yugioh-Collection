import { create } from "zustand";
import { Card } from "../types/types.d";
import { getStoreData , initDB, addData, updateData, deleteData, existsData, getData, clearData} from "../db/cardDB";
import { getLimitedCollection } from "../utils/paginationUtils";
import { sortingCards } from "../utils/sortingCardsUtils";
interface State {
 
 collection: Card[];
  limitedCollection: Card[];
  page: number;
  LIMIT_CARDS: number;
  sort: string;
  order: string;
  setCollection: (collection: Card[]) => void;
  setSort: (sort: string) => void;
  setOrder: (order: string) => void;
  getCollection: () => Promise<Card[]>;
  getCard: (card: Card) => Promise<Card | null>;
  addCard: (card: Card) => Promise<Card[] | string>;
  removeCard: (card: Card) => Promise<void | string>;
  removeAllCopies: (card: Card) => Promise<void | string |null>;
  clearCollection: () => Promise<boolean>;
  existsCard: (card: Card) => Promise<boolean>;
  SetPage: (page:number) => void;
  RefreshPage: () => void;
  SortingCards: () => void;


}


export const useCollectionStore = create<State>((set, get) => {

  const calculateLimitAndOffset = () => {
    const { page, LIMIT_CARDS } = get();
    const limit = LIMIT_CARDS * page;
    const offset = limit - LIMIT_CARDS;
    return { limit, offset };
  };

  const deleteFromCollection = async( card: Card) => {
    await deleteData('cards', card.id) // delete from db
    const{ sort, order } = get();
    const { collection } = get();
    const newCollection = collection.filter((c) => c.id !== card.id); // delete from store
    const sortedCollection = sortingCards(sort, order, newCollection)
    return sortedCollection;
  }

  const deleteOneFromCollection = async(card: Card) => {

    await updateData('cards', card) // update cantidad en la db
    const { collection } = get();
    const cardExists = collection.find((c) => c.id === card.id); // update cantidad en el store
    if (cardExists) {
      const newCollection = collection.map((c) => {
      if (c.id === card.id) {
        return card;
      }
      return c;
      });

      const { sort, order } = get();
      const sortedCollection = sortingCards(sort, order, newCollection)
      return sortedCollection;
    }
    return collection;
  }

  return {

    collection: [],
    page: 1,
    limitedCollection: [],
    LIMIT_CARDS: 10,
    sort: '',
    order: 'asc',
    setCollection: (collection: Card[]) => set({ collection }),
    setSort: (sort: string) => set({ sort }),
    setOrder: (order: string) => set({ order }),
    getCollection: async () => {
      const dbExists = await initDB();
      if (!dbExists) {
        return [];
      }
      const collection = await getStoreData<Card>('cards');
      const { limit, offset } = calculateLimitAndOffset();
      set({ 
        collection,
        limitedCollection: getLimitedCollection(collection, limit, offset) 
      });
      return collection;
    },
    getCard: async (card: Card) => {
      const dbExists = await initDB();
      if (!dbExists) {
        return null;
      }
      const cardInDb:Card = await getData('cards', card.id)
      return cardInDb;
    },
    addCard: async (card: Card) => {

      const dbExists = await initDB();
      if (!dbExists) {
        return 'DB does not exist';
      }

      const { limit, offset } = calculateLimitAndOffset();
      const cardExistsinDB = await existsData('cards', card.id);
      let newCard = {...card, cantidad: 1}

      if (cardExistsinDB) {
        const cardInDb:Card = await getData('cards', card.id)
        const cantidad = cardInDb.cantidad + 1
          newCard = {
            ...card,
            cantidad
          }
          await updateData('cards', newCard)        
      }else{
        await addData('cards', newCard)
      }

      const collection = await getStoreData<Card>('cards');

      const{ sort, order } = get();

      const sortedCollection = sortingCards(sort, order, collection)

      set({ collection : sortedCollection , limitedCollection: getLimitedCollection(sortedCollection, limit, offset) });

      return collection;

    },
    removeCard: async (card: Card) => {
  
      const dbExists = await initDB();
      if (!dbExists) {
        return 'DB does not exist';
      }
      const { limit, offset } = calculateLimitAndOffset();
      const cardExistsinDB = await existsData('cards', card.id);
      if (cardExistsinDB) {
        const cardInDb:Card = await getData('cards', card.id)
        const cantidad = cardInDb.cantidad - 1
        const newCollection =  cantidad === 0 ? await deleteFromCollection(card) : await deleteOneFromCollection({...card, cantidad})
        set({ collection: newCollection, limitedCollection: getLimitedCollection(newCollection, limit, offset) });
      } 
    },
    removeAllCopies: async (card: Card) => { 

        const dbExists = await initDB();
        if (!dbExists) {
          return 'DB does not exist';
        }

        const cardExistsinDB = await existsData('cards', card.id);
        const { limit, offset } = calculateLimitAndOffset();
        const newCollection = cardExistsinDB ? await deleteFromCollection(card) : get().collection;
        set({ collection: newCollection , limitedCollection: getLimitedCollection(newCollection, limit, offset)});
          
        return null;
    },
    clearCollection: async () => {
      const dbExists = await initDB();
      if (!dbExists) {
        return false;
      }
      await clearData('cards' );
      set({ collection: [] , limitedCollection: [], page: 1, sort: '', order: 'asc' });
      return true;
    },
    existsCard: async (card: Card) => {
      const dbExists = await initDB();
      if (!dbExists) {
        return false;
      }
      const cardExistsinDB = await existsData('cards', card.id);
      return cardExistsinDB;
    },
    SetPage: async (page:number) => {
      set({page})
    },
    RefreshPage: async () => {
      set({page: 1})
    },
    SortingCards: () => {
      const { collection, sort, order } = get();
      const { limit, offset } = calculateLimitAndOffset();
      const sortedCollection = sortingCards(sort, order, collection)
      set({ collection: sortedCollection, limitedCollection: getLimitedCollection(sortedCollection, limit, offset) });
    },


    
  };
});