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


function Collection() {
  
  const {collection, limitedCollection, page, SetPage, LIMIT_CARDS, setOrder, setSort , sort, totalCards, totalPrice, clearCollection} = useCollection()
  const [modal , setModal] = useState<boolean>(false)

  const handleClearCollection = () => {
    setModal(!modal)
  }


  return (

  <>
    <Header/>
    <SearchBar/>
    <Sorts setOrder={setOrder} setSort={setSort} sort={sort}/>

    {collection.length > 0  && <> <ClearCollection modal={modal} handleClearCollection={handleClearCollection} clearCollection={clearCollection}/>

    <div className='flex justify-evenly bg-[#00000066] rounded my-2 '>
      <h2 className='text-2xl font-bold my-5'>Total Price: {totalPrice}</h2>
      <h2 className='text-2xl font-bold my-5 mx-5'>Total Cards: {totalCards}</h2>
    </div>
    
</>}
    
    {limitedCollection && limitedCollection.length > 0 
      ? <ListOfCards cards={limitedCollection as Card[]} title={"My Collection"}/> 
      : <h1 className='text-2xl font-bold my-5'>*No tienes cartas en tu colección*</h1>}
    


    <Pagination page={page} setPage={SetPage} cardsNumber={collection.length} limitCards={LIMIT_CARDS} />
    <Footer/>
   </>
  )
}

export default Collection
