import './App.css'
import { ListOfCards } from './Components/ListOfCards'
import {Header} from './Components/Header'
import { SearchBar } from './Components/Search'
import {Footer} from './Components/Footer'
import {Pagination} from './Components/Pagination'
import { useSearch } from './hooks/useSearch'
import { Sorts} from './Components/Sorts'

function Search( ) {
  const {limitedCards, cards, SetPage, page, LIMIT_CARDS, setOrder,setSort,sort} = useSearch()

  return (

    <>
  <Header/>
  <SearchBar/>
  {limitedCards.length > 0 && <Sorts  setOrder={setOrder} setSort={setSort} sort={sort}/>}
  <ListOfCards title={'Search...'} cards={limitedCards} />
  {limitedCards.length === 0 && <h1 className='text-2xl font-bold my-5 text-[black]'><span className='bg-white p-2 rounded'>*No cards found*</span></h1>}
    {cards && cards.length > 0 ? <Pagination page={page} setPage={SetPage} cardsNumber={cards.length} limitCards={LIMIT_CARDS} /> : null } 
  <Footer/>
   </>
  )
}

export default Search
