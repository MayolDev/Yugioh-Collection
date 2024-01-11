
import { useCardsStore } from "../store/Search";
import { useEffect } from "react";


export const useSearch = () => {
  const { limitedCards, cards, SetPage, page, SortingCards, setOrder, setSort, sort, LIMIT_CARDS, order } = useCardsStore(state => state);

  useEffect(SortingCards
    , [page, sort, order, SortingCards]);

  return { LIMIT_CARDS, limitedCards, cards, SetPage, page , SortingCards, setOrder, setSort, sort };
};
