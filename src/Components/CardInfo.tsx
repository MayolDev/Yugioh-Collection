
import { Card } from '../types/types.d'
import { useCardInfo } from '../hooks/useCardInfo'

export const CardInfo = ({card } : {card:Card})  => {  
  
  const {name, type, card_images, desc, atk, def, level, attribute,race } = card
  
  const {handleAddToCollection, handleRemoveFromCollection, handleRemoveOneFromCollection, existInCollection, cantidad} = useCardInfo(card)

  
    return  (
      
        <div className='flex flex-col items-center	bg-[#00000066] rounded my-5 p-5'>
          {existInCollection ? <small className=''>* This card is already in your collection *</small> : null}
            <h3 className="text-3xl font-bold my-2 text-[#ffc100]">{name}</h3>
            <small className='font-bold	mb-2 '>( {type} )</small>
            <div className='flex gap-2 font-bold items-center mb-2 text-md'>
                {attribute !== undefined ?  <small className='py-2 px-5 h-auto bg-[#9a0056] rounded'>{attribute}</small> : null}
                <small className='py-2 px-5 h-auto bg-[#9a0056] rounded'>{race}</small>

            </div>
            <div className='relative'>
      <img src={card_images[0].image_url} alt={name}  width={300} height={300}/>
      {cantidad > 0 ? <p className={`text-xl absolute top-0 rounded-full bg-[#9a0056] w-8 h-8 font-bold border-2 cantidad`}>x{cantidad}</p> : null}
      </div>

      <div className='flex justify-between	w-80 my-2'>
        {atk || atk === 0  ?  (
          <div className='flex gap-2'>
            <p className='font-bold text-2xl'>ATK</p>
            <p className='text-2xl'>{atk}</p>
            </div>
        ) : null}
        {def || def === 0  ? (
          <div className='flex gap-2'>
            <p className='font-bold text-2xl'>DEF</p>
            <p className='text-2xl'>{def}</p>
            </div>
        ) : null}
        {level && (
          <div className='flex gap-2'>
            <p className='font-bold text-2xl'>Level</p>
            <p className='text-2xl'>{level}</p>
            </div>
        )}
        
      </div>
      <div className='flex gap-2 my-2'>
        <button className='bg-[green] text-white p-2 rounded font-bold ' onClick={handleAddToCollection}>+ Add to Collection</button>
        {existInCollection ? <button className='bg-[red] text-white p-2 rounded font-bold' onClick={handleRemoveFromCollection}>- Remove All</button> : null}
        {existInCollection ? <button className='bg-amber-500 text-white p-2 rounded font-bold' onClick={handleRemoveOneFromCollection}>-1 Remove One</button> : null}
        </div>
      <div className='text-left	'>
      <p className='font-bold text-2xl my-2'>Description: </p>
      <p className='text-2xl tex'>{desc}</p>
      </div>
        </div>
    )
}