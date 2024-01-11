import { useEffect } from "react";
import { useCollectionStore } from "../store/collection";

export const useCollection = () => {
  const { 
      collection, 
      limitedCollection, 
      getCollection, 
      page, 
      SetPage,
      SortingCards,
      setSort,
      setOrder,
      sort,
      order, 
      LIMIT_CARDS,
      addCard,
      removeCard,
      removeAllCopies,
      getCard,
      existsCard
  } = useCollectionStore(state => state);
  
    useEffect(() => {
      getCollection();
    }, [getCollection, SortingCards]);

    useEffect(() => {
      SortingCards();
    }, [page, SortingCards, sort, order]);

  return {
      collection, 
      limitedCollection, 
      getCollection, 
      page, 
      SetPage, 
      SortingCards,
      setSort,
      setOrder,
      sort,
      LIMIT_CARDS,
      addCard,
      removeCard,
      removeAllCopies,
      getCard,
      existsCard
  };
};