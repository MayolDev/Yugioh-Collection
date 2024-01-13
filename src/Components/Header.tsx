import {Link} from 'react-router-dom'

export const Header = () => {
    return (
        <header className='w-full bg-[#F8E9C0] p-5 rounded flex justify-between items-center	'>
        <Link to={"/"}><img src="logo.png" alt="logo" width={150} height={150}/></Link>
        <ul className='flex  gap-5 '>
            <li className='font-bold text-2xl text-[#580069] uppercase bg-[#]'><Link to={"/"}>Home</Link></li>
            <li className='font-bold text-2xl text-[#580069] uppercase'><Link to={"/collection"}>Collection</Link></li>
        </ul>
  
      </header>
    )
}