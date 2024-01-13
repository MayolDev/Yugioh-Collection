
import { useCardsStore } from "../store/Search"
import {useNavigate} from "react-router-dom"

export const SearchBar = () => {

    const searchCards = useCardsStore(state => state.SearchCards)  
    const SetPage = useCardsStore(state => state.SetPage)
    const navigate = useNavigate();

    const handleSubmit =async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!e.currentTarget) return
        if(!e.currentTarget.q) return
        if(!e.currentTarget.q.value) return
        if(e.currentTarget.q.value === "") return
        if (e.currentTarget.q.value.length < 3  && e.currentTarget.q.value.length > 50) return
        
        const formData = new FormData(e.currentTarget)
        const q = formData.get("q") as string
        await searchCards(q)
        SetPage(1)
        navigate(`/search`);
    }

    return (
        <form className="w-full p-2 my-1 bg-[#F8E9C0] text-white gap-2 flex justify-center items-center rounded " onSubmit={handleSubmit} >
            <label className="text-[#580069] font-bold text-2xl  ">Search</label>
            <input className="bg-[#000000aa] text-white placeholder:text-white p-2 w-80 rounded" type="search" id="q" aria-label="Search Cards" name="q" placeholder="Search a card by name..."  />
            <button className="bg-[#580069] text-white p-2 rounded" >Search</button>

        </form>
    )

}