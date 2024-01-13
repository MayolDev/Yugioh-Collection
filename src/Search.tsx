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
  <ListOfCards title={'Search...'} cards={limitedCards} error='*No cards found*' />
  <Pagination page={page} setPage={SetPage} cardsNumber={cards.length} limitCards={LIMIT_CARDS} />
  <Footer/>
   </>
  )
}

export default Search
