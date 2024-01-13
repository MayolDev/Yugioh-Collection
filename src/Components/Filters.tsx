import { useState } from "react";

export const Filters = ({FilterByType, getCollection} : { FilterByType :  (type:string) => void ; getCollection: () => void}) => {

    const [CardType, setCardtype] = useState<string>('' as string)
    const types = [
     'Spell Card',
     'Trap Card', 
     'Normal Monster', 
     'Toon Monster', 
     'Fusion Monster', 
     'XYZ Monster', 
     'Link Monster', 
     'Tuner Monster', 
     'Synchro Monster', 
     'Skill Card', 
     'Ritual Effect Monster', 
     'Pendulum Effect Monster', 
     'Token',
    'Flip Effect Monster']

     types.sort((a,b) => a.localeCompare(b))



     return (

        <div className='bg-[#F8E9C0] rounded py-3 my-2'>
            <h2 className='text-center text-2xl font-bold pb-2 text-[#580069] uppercase'>Filters</h2>

            <div className='flex flex-wrap justify-center gap-4 items-center'>

                <button className='px-4 py-1  rounded font-bold bg-black' onClick={() => {
                    getCollection()
                    setCardtype('')
                }}>All</button>
            {types.map((type) => (
          <button
            key={type}
            className={`px-4 py-1  rounded font-bold  ${type === CardType ? "bg-[#580069]" : "bg-black"}`}
            onClick={() => {
                FilterByType(type)
                setCardtype(type)
            }}
          >
            {type}
          </button>
        ))}
             </div>
         </div>
     )


}