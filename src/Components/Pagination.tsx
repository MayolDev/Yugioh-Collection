export const Pagination = ({page , setPage , cardsNumber, limitCards} : {page: number , setPage:(page:number) => void, cardsNumber:number , limitCards:number}) => {
    return (
        <div className="flex items-center gap-5 justify-center my-4">
        {page !== 1 && ( <button className='font-bold text-xl' onClick={ () =>  {
            setPage(page - 1)
            
        }} disabled={page === 1}>
            Anterior
        </button>)}
       
        <span className='font-bold'>{page}</span>

        {page  < (cardsNumber / limitCards) && (
            <button
            className='font-bold text-xl'
            onClick={() => {
                setPage(page + 1)
                
            
            }}
            disabled = {page >= (cardsNumber / limitCards)}
        >
            Siguiente
        </button>)
            }
        
    </div>
    )
}