import { Card } from "../types/types.d";
import { CardInfo } from "./CardInfo";
import { useState } from "react";

export const ListOfCards = ({cards, title} : {cards : Card[], title: string}) => {

    const [modal , setModal] = useState<boolean>(false)
    const [cardInfo , setCardInfo] = useState<Card | null>(null)
    

    const handleCardInfo = ({card} : {card : Card}) => {
        setModal(true)
        setCardInfo(card)
    }

    const handleCloseModal = () => {
        setModal(false)
        setCardInfo(null)
    }




    return cards  && cards.length > 0 ? (
        <div className="bg-[#00000066] rounded p-10 relative min-h-[700px]">
                        <h2 className="text-3xl font-bold text-[#ffc100] mb-5">{title}</h2>
        <div className="grid grid-cols-5 grid-flow-row gap-2 ">
            {cards.map((card) => (
                <div key={card.id} className="flex flex-col justify-center items-center cursor-pointer bg-[#580069] py-5 rounded truncate ... px-2 h-auto max-h-[350px] relative" onClick={() => {
                    handleCardInfo({card})
                    setModal(true)
                }}>
                    <div className='relative'>
                        <img  src={card.card_images[0].image_url} alt={card.name} width={150} height={150} />
                        <div className="absolute bottom-0 left-0 bg-[#00000066] rounded p-2 w-full flex gap-2 justify-between">
                            <small className="text-white font-bold">ATK: {card.atk}</small>
                            <small className="text-white font-bold">DEF: {card.def}</small>
                        </div>
                        

                    </div>
                    {card.card_prices[0].cardmarket_price ? <small className="absolute top-0 right-0 bg-[#000000bb] rounded p-2 text-white font-bold"> ${card.card_prices[0].cardmarket_price}</small> : null}
                    {card.cantidad > 0 ? <p className='text-xl absolute top-0 left-0 rounded-full bg-[#9a0056] w-8 h-8 font-bold border-2'>x{card.cantidad}</p> : null}
                    
                    <h3 className="text-[#ffc100] text-xl my-2 font-bold truncate w-full">{card.name}</h3>
                    <small className="text-white text-md font-bold">{card.type}</small>
                    
                    </div>
            ))}
            {modal && cardInfo &&  
            <div className="w-full h-full bg-[#00000077] absolute inset-0 flex justify-center items-center" >
                
            <div className=" bg-[#00000077] w-full h-full relative overflow-y-auto" >
            <button className="bg-[red] font-bold text-white p-2 rounded absolute top-10 right-10" onClick={handleCloseModal}>Close View</button>
            <CardInfo card={cardInfo}  />
            
            </div>
            </div>
            
            }





       </div>
       </div>
    ): null


}