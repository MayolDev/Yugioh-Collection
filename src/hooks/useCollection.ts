import { useEffect, useMemo } from "react";
import { useCollectionStore } from "../store/collection";
import { Card } from "../types/types.d";

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
      existsCard,
      clearCollection
  } = useCollectionStore(state => state);

  const totalPrice = useMemo(() => {
    const CollectionPricesWithoutDollarSymbol = collection.map((card: Card) => {
      card.card_prices[0].cardmarket_price  = card.card_prices[0].cardmarket_price.replace('$', '')
      return card
    }
    )
    const totalPrice = CollectionPricesWithoutDollarSymbol.reduce((acc: number, card: Card) => {
      return acc + Number(Number(card.card_prices[0].cardmarket_price) * card.cantidad) 
    }, 0)

    const totalPriceString = totalPrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    return totalPriceString
  }, [collection])


  const totalCards = useMemo(() => {
    const totalCards = collection.reduce((acc: number, card: Card) => {
      return acc + Number(card.cantidad)
    }, 0)
    return totalCards
  }, [collection])
  
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
      existsCard,
      totalPrice,
      totalCards,
      clearCollection
  };
};