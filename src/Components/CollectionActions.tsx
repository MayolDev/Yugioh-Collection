import { Card } from "../types/types.d";
import { ClearCollection } from "./ClearCollection";

export const CollectionAction = ({collection, modal, handleClearCollection, clearCollection, ExportCollectionInCSV, importCollectionFromCsv} : {collection:Card[], modal:boolean, handleClearCollection:() => void, clearCollection:() => void, ExportCollectionInCSV:() => void, importCollectionFromCsv:(file:File) => void}) => {


    return (
        <div className='flex gap-2 justify-center items-center flex-wrap mb-2'>
      {collection.length > 0 && 

          <>
          <ClearCollection modal={modal} handleClearCollection={handleClearCollection} clearCollection={clearCollection}/>
          <button className='bg-slate-900 font-bold text-white p-2 rounded mt-2' onClick={ExportCollectionInCSV}>Export Collection</button>
          </>
      }

      <input type="file" accept=".csv" onChange={(e) => {
        e.target.files && importCollectionFromCsv(e.target.files[0])}} className='bg-slate-900 font-bold text-white p-2 rounded mt-2'/>

      </div>
    )

}