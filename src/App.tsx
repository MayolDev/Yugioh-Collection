
import './App.css'
import {useGetRandomCard} from './hooks/useCard'

import {CardInfo} from './Components/CardInfo'
import {Header} from './Components/Header'
import { SearchBar } from './Components/Search'
import {Footer} from './Components/Footer'

function App() {

  
  const { card, loading, getRandomCard} = useGetRandomCard()


  return (

    <>
  <Header/>
  <SearchBar/>
  <button onClick={getRandomCard} className='py-2 px-5 bg-[#580069] font-bold rounded my-5 block w-[200px] m-auto shadow-md'>Random Card </button>
  { card ? <CardInfo card={card}/> : null}
  {loading && <div className='flex justify-center items-center h-[80vh]'>
    <div className="lds-dual-ring"></div>
    

    </div>}

  <Footer/>
    

   
   </>
  )
}

export default App
