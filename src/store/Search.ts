import { create } from "zustand";
import { Card } from "../types/types.d";
import { getLimitedCollection } from "../utils/paginationUtils";
import { sortingCards } from "../utils/sortingCardsUtils";

interface State {
  cards: Card[];
  limitedCards: Card[];
  page: number;
  sort: string;
  order: string;
  LIMIT_CARDS: number;
  SearchCards: (search: string) => Promise<void>;
  SortingCards: () => void;
  SetPage: (page: number) => void;
  RefreshPage: () => void;
  setSort: (sort: string) => void;
  setOrder: (order: string) => void;

}

export const useCardsStore = create<State>((set, get) => {

  const calculateLimitAndOffset = () => {
    const { page, LIMIT_CARDS } = get();
    const limit = LIMIT_CARDS * page;
    const offset = limit - LIMIT_CARDS;
    return { limit, offset };
  };

  return {
    cards: [],
    limitedCards: [],
    LIMIT_CARDS: 10,
    page: 1,
    sort: "",
    order: "asc",
    setSort: (sort: string) => set({ sort }),
    setOrder: (order: string) => set({ order }),
    SearchCards: async (search:string) => {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${search}`
      );
      const data = await res.json();
      console.log(data)
      if (data.error) {
        set({ cards: [], limitedCards: [] });
        return;
      }
      const cards = data.data;
      const { limit, offset } = calculateLimitAndOffset();
      set({ cards , limitedCards: getLimitedCollection(cards, limit, offset) });
    },
  
    SortingCards: () => {
      const { cards, sort, order } = get();
      const { limit, offset } = calculateLimitAndOffset();
      const sortedCollection = sortingCards(sort, order, cards)
      set({ cards: sortedCollection, limitedCards: getLimitedCollection(sortedCollection, limit, offset) });
    },
    SetPage: async (page:number) => {
        set({page})
    },
    RefreshPage: async () => {
        set({page: 1})
    }


  };
});