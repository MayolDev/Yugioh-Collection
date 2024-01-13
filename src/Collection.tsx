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
import { Filters } from './Components/Filters'
import { Statistics } from './Components/Statistics'
import { CollectionAction } from './Components/CollectionActions'


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
    {collection.length > 0 && <Sorts setOrder={setOrder} setSort={setSort} sort={sort}/>}
    {collection.length > 0  && <Statistics totalCards={totalCards} totalPrice={totalPrice}/>}

    <CollectionAction 
      collection={collection} 
      modal={modal} 
      handleClearCollection={handleClearCollection} 
      clearCollection={clearCollection} 
      ExportCollectionInCSV={ExportCollectionInCSV} 
      importCollectionFromCsv={importCollectionFromCsv}/>
    
    {limitedCollection && limitedCollection.length > 0 
      ? <ListOfCards cards={limitedCollection as Card[]} title={"My Collection"}/> 
      : <h1 className='text-2xl font-bold my-5 text-black'><span className='bg-white p-2 rounded'>*No cards found in your collection*</span></h1>}
    
    <Pagination page={page} setPage={SetPage} cardsNumber={collection.length} limitCards={LIMIT_CARDS} />
    <Filters FilterByType={FilterByType} getCollection={getCollection}/>
    <Footer/>
  </>
  )
}

export default Collection
