import { useEffect, useState } from 'react'
import { Card } from '../types/types.d'

export const useGetRandomCard = () => {
    const [card, setCard] = useState<Card | null>(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch('https://db.ygoprodeck.com/api/v7/randomcard.php')
        .then(res => res.json())
        .then(data => {
            const dataCard : Card = {
                id : data.id,
                name : data.name,
                type : data.type,
                desc : data.desc,
                atk : data.atk,
                def : data.def,
                level : data.level,
                race : data.race,
                attribute : data.attribute,
                card_images : data.card_images,
                card_prices : data.card_prices,
                cantidad : 0
            }

            setCard(dataCard)
            setLoading(false)
        })
    }, [])

    const getRandomCard = async () => {
      setLoading(true)
      setCard(null)
        fetch('https://db.ygoprodeck.com/api/v7/randomcard.php')
        .then(res => res.json())
        .then(data => {
            const dataCard : Card = {
                id : data.id,
                name : data.name,
                type : data.type,
                desc : data.desc,
                atk : data.atk,
                def : data.def,
                level : data.level,
                race : data.race,
                attribute : data.attribute,
                card_images : data.card_images,
                card_prices : data.card_prices,
                cantidad : 0
            }

            setCard(dataCard)
            setLoading(false)
        })

    }
  
   
    return { card, loading , getRandomCard }
  }