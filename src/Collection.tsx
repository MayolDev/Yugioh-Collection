import './App.css'
import {Header} from './Components/Header'
import { SearchBar } from './Components/Search'
import { Footer } from './Components/Footer'
import { Card } from './types/types.d'
import { ListOfCards } from './Components/ListOfCards'
import { Pagination } from './Components/Pagination'
import { useCollection } from './hooks/useCollection'
import { Sorts } from './Components/Sorts'
import {useState} from 'react'
import { ClearCollection } from './Components/ClearCollection'
import { Filters } from './Components/Filters'


function Collection() {
  
  const {collection, limitedCollection, page, SetPage,
     LIMIT_CARDS, setOrder, setSort , sort, totalCards, totalPrice, clearCollection, FilterByType,
      getCollection, ExportCollectionInCSV , importCollectionFromCsv} = useCollection()
  const [modal , setModal] = useState<boolean>(false)

  const handleClearCollection = () => {
    setModal(!modal)
  }

  return (

  <>
    <Header/>
    <SearchBar/>
    {collection.length > 0 && 
      <div className='flex flex-col justify-center  flex-wrap lg:flex-nowrap lg:gap gap mt-2'>
           <Sorts setOrder={setOrder} setSort={setSort} sort={sort}/>
               
      </div>}

      <div className='flex gap-2 justify-center items-center flex-wrap'>
      {collection.length > 0 && 

          <>
          <ClearCollection modal={modal} handleClearCollection={handleClearCollection} clearCollection={clearCollection}/>
          <button className='bg-slate-900 font-bold text-white p-2 rounded mt-2' onClick={ExportCollectionInCSV}>Export Collection</button>
          </>
      }
      <input type="file" accept=".csv" onChange={(e) => {
        e.target.files && importCollectionFromCsv(e.target.files[0])}} className='bg-slate-900 font-bold text-white p-2 rounded mt-2'/>

      </div>

    {collection.length > 0  && 
   
    <div className='flex justify-evenly bg-[#00000066] rounded my-2 '>
      <h2 className='text-2xl font-bold my-5'>Total Price: {totalPrice}</h2>
      <h2 className='text-2xl font-bold my-5 mx-5'>Total Cards: {totalCards}</h2>
    </div>
    
    }
    
    {limitedCollection && limitedCollection.length > 0 
      ? <ListOfCards cards={limitedCollection as Card[]} title={"My Collection"}/> 
      : <h1 className='text-2xl font-bold my-5'>*No tienes cartas en tu colección*</h1>}
    
    <Pagination page={page} setPage={SetPage} cardsNumber={collection.length} limitCards={LIMIT_CARDS} />

      <Filters FilterByType={FilterByType} getCollection={getCollection}/>
    <Footer/>
  </>
  )
}

export default Collection
