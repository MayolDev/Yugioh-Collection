
export const ClearCollection = ({modal,handleClearCollection, clearCollection } : {modal : boolean, handleClearCollection: () => void, clearCollection : () => void}) => {


      return (
        <>
        <button className='bg-red-600 font-bold text-white p-2 rounded mt-2' onClick={handleClearCollection}>Delete Collection</button>

        {modal &&
    <div className="w-full h-full  bg-[#00000077] absolute inset-0 flex justify-center items-center z-50" >

    <div className=" bg-[#00000077] w-full h-full relative overflow-y-auto" >
    <button className="bg-[red] font-bold text-white p-2 rounded absolute top-10 right-10" onClick={handleClearCollection}>Close View</button>
    <div className='bg-white rounded p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <h2 className='text-2xl font-bold text-center text-black'>Are you sure you want to delete your collection?</h2>
      <div className='flex justify-evenly'>
        <button className='bg-red-900 font-bold text-white p-2 rounded mt-2' onClick={() => {
          clearCollection()
          handleClearCollection()
        }}>Yes</button>
        <button className='bg-red-600 font-bold text-white p-2 rounded mt-2' onClick={handleClearCollection}>No</button>
      </div>
    </div>
    </div>
    </div>
    }

        </>


      )

}