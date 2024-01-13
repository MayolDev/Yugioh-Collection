
import { useEffect, useState } from "react";
import { useCollection } from "./useCollection";
import { Card } from "../types/types.d";

export const useCardInfo = (card : Card) => {

  const { collection, addCard, removeCard, removeAllCopies, getCard, existsCard} = useCollection()
  const [existInCollection, setExistInCollection] = useState(false)
  const [cantidad, setCantidad] = useState(0)

    useEffect(() => {
      (async () => {
         const res = await existsCard(card);
         setExistInCollection(res);
         if (res) {
            const cardData = await getCard(card);
            setCantidad(cardData?.cantidad || 0);
            //animation when card is added to collection in cantidad
            if(cantidad > 0){
                const card = document.querySelector('.cantidad')
                card?.classList.add('animate-bounce')
                setTimeout(() => {
                card?.classList.remove('animate-bounce')
                }, 1000);
            }
         } else {
            setCantidad(0);
         }
      })();
   }, [existsCard, collection, card, getCard, cantidad]);
  
    const handleAddToCollection = async () => {

     await addCard(card)

    }

    const handleRemoveFromCollection = async () => {

      removeAllCopies(card)

    }

    const handleRemoveOneFromCollection = async () => {
    
      await removeCard(card)
  
    }


    return { handleAddToCollection, handleRemoveFromCollection, handleRemoveOneFromCollection, existInCollection, cantidad }

}