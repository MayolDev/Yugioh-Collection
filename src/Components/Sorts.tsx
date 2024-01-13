import { useYugiohSorts } from "../hooks/useYugiohSorts";
interface Props {
    setSort: (sort: string) => void
    setOrder: (order: string) => void
    sort : string
}

export const Sorts = ({setSort, setOrder, sort}: Props) => {

    const { sortBy, handleSelectChange } = useYugiohSorts({ setOrder, setSort });
    
      return (
        <div className='bg-[#F8E9C0] rounded py-3 my-2'>
            <h2 className='text-center text-2xl font-bold pb-2 text-[#580069] uppercase'>Sorts</h2>
            <div className='flex  justify-center gap-4 flex-wrap'>
            {Object.keys(sortBy).map((property) => (
          <button
            key={property}
            className={`px-4 py-1  rounded font-bold ${sort === property ? "bg-[#580069]" : "bg-black"}`}
            onClick={sortBy[property]}
          >
            {property}
          </button>
        ))}
                <select className='bg-black rounded px-2 font-bold py-2' onChange={handleSelectChange}>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
             </div>
         </div>

      )

}