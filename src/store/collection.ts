import { create } from "zustand";
import { Card } from "../types/types.d";
import { getStoreData , initDB, addData, updateData, deleteData, existsData, getData, clearData} from "../db/cardDB";
import { getLimitedCollection } from "../utils/paginationUtils";
import { sortingCards } from "../utils/sortingCardsUtils";
import { arrayObjToCsv, CardExport } from "../utils/objectToCsv";

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
  FilterByType: (type: string) => void;
  ExportCollectionInCSV: () => void;
  importCollectionFromCsv: (file: Blob) => void;
 
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
   
    FilterByType: async (type: string) => {
      const dbExists = await initDB();
      if (!dbExists) {
        return false;
      }
      const { limit, offset } = calculateLimitAndOffset();
      const collection = await getStoreData<Card>('cards');
      const filteredCollection = collection.filter((card) => card.type === type);
      set({ collection: filteredCollection, limitedCollection: getLimitedCollection(filteredCollection, limit, offset) , page: 1});
      return true;
    },

    ExportCollectionInCSV: async () => {
        
        const dbExists = await initDB();
        if (!dbExists) {
            return false;
        }
  
        const collection = await getStoreData<Card>('cards');
        const collectionToExport = collection.map((card: Card) => {  

          return {
            id: card.id,
            name: card.name,
            type: card.type,
            desc: card.desc,
            atk  : card.atk,
            def: card.def,
            level: card.level,
            race : card.race,
            attribute: card.attribute,
            card_images: card.card_images[0].image_url,
            card_prices: card.card_prices[0].cardmarket_price,
            cantidad: card.cantidad
          }
          
        }
        )
        arrayObjToCsv(collectionToExport)
        return true;

  },

    importCollectionFromCsv : async (file: Blob) => {
      const dbExists = await initDB();
      if (!dbExists) {
        return false;
      }
    
      const reader = new FileReader();
      reader.onload = async function () {
        const csv = reader.result;
        const lines = (csv as string).split('\n');
        const headers = lines[0].split(',').map((header) => header.trim().replace(/"/g, '').replace("\r", ''));
        
        console.log('headers', headers);
    
        const cards = lines.slice(1).map((line) => {
          const card: CardExport = {
            id: 0,
            name: '',
            type: '',
            desc: '',
            atk: null,
            def: null,
            race: '',
            level: undefined,
            attribute: undefined,
            card_images: '',
            card_prices: '',
            cantidad: 0,
          };
          const values = line.split(',');
    
          headers.forEach((header, index) => {
            const value = values[index].trim();
            if (value !== '') {
              card[header] = isNaN(Number(value)) ? value : Number(value);
            } else {
              card[header] = null;
            }
          });
    
          return card;
        });
    
        const newCollection: Card[] = cards.map((card) => {
        
          console.log('card', card.cantidad);

        return ({
          id: card.id as number,
          name: card.name.split('"').join("")  as string,
          type: card.type.split('"').join("") as string,
          desc: card.desc.split('"').join("") as string,
          atk: card.atk as number | null,
          def: card.def as number | null,
          race: card.race.split('"').join("") as string,
          level: card.level as number | undefined,
          attribute: card.attribute?.split('"').join("") as string | undefined,
          card_images: [{ image_url: card.card_images.split('"').join("") as string, image_url_small: '' }],  // Ajusta según tu estructura
          card_prices: [{ cardmarket_price: card.card_prices.split('"').join("") as string, tcgplayer_price: '', ebay_price: '', amazon_price: '' }],  // Ajusta según tu estructura
          cantidad: card.cantidad as number,
        })
      });
    
    
        await clearData('cards');
        newCollection.forEach(async (card) => {
          await addData('cards', card);
        });
        
        const {limit, offset} = calculateLimitAndOffset();
        set({ collection: newCollection, limitedCollection: getLimitedCollection(newCollection, limit, offset) });

      };
    
      reader.readAsText(file);
      return true;
  }
  
  };

});