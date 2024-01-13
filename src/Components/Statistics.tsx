export const Statistics = ({totalPrice, totalCards} : {totalPrice : string, totalCards : number}) => {

return (<div className='flex justify-evenly bg-[#F8E9C0] rounded my-2 py-2'>
          <h2 className='text-2xl font-bold text-[#580069]'>Total Price: {totalPrice}</h2>
          <h2 className='text-2xl font-bold  text-[#580069]'>Total Cards: {totalCards}</h2>
</div>)

}